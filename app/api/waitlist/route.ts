import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, phoneNumber, businessName, userType } = body;

    // Validate required fields
    if (!email || !phoneNumber || !userType) {
      return NextResponse.json(
        { error: 'Email, phone number, and user type are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate phone number format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phoneNumber.replace(/[\s\-\(\)]/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Validate user type
    if (!['vendor', 'couple'].includes(userType)) {
      return NextResponse.json(
        { error: 'Invalid user type' },
        { status: 400 }
      );
    }

    // If vendor, business name is required
    if (userType === 'vendor' && !businessName) {
      return NextResponse.json(
        { error: 'Business name is required for vendors' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('mehfil');
    const collection = db.collection('waitlist');

    // Check if email already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Check if phone number already exists
    const existingPhone = await collection.findOne({ phoneNumber });
    if (existingPhone) {
      return NextResponse.json(
        { error: 'Phone number already registered' },
        { status: 409 }
      );
    }

    // Create the document to insert
    const document = {
      email,
      phoneNumber,
      userType,
      ...(userType === 'vendor' && businessName && { businessName }),
      createdAt: new Date(),
      status: 'active'
    };

    // Insert the document
    const result = await collection.insertOne(document);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully joined the waitlist!',
        id: result.insertedId 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('mehfil');
    const collection = db.collection('waitlist');

    // Get counts by user type
    const vendorCount = await collection.countDocuments({ userType: 'vendor', status: 'active' });
    const coupleCount = await collection.countDocuments({ userType: 'couple', status: 'active' });
    const totalCount = await collection.countDocuments({ status: 'active' });

    return NextResponse.json({
      success: true,
      data: {
        vendors: vendorCount,
        couples: coupleCount,
        total: totalCount
      }
    });

  } catch (error) {
    console.error('Error fetching waitlist stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}