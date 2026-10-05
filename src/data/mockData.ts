import { Announcement, Complaint, MessMenuDay, Payment, Room, UserProfile } from '../types';

export const HOSTEL_FACTS = {
  name: 'Rainbow Boys Hostel',
  platformName: 'Rainbow One',
  tagline: 'Everything your hostel needs, in one place.',
  buildingCount: 1,
  floorsCount: 3,
  roomsCount: 33,
  bedsCount: 66,
  roomType: 'Double Sharing',
  monthlyRent: 7400,
  twoMonthPayment: 14400, // Configurable structure reported by hostel
  vacantRoomsApprox: '3–4 rooms',
  furniture: [
    '2 Beds with mattress space',
    '2 Individual study chairs',
    'Study & workspace table',
    'Personal almirah / storage',
    'Wall-mounted utility shelves',
  ],
  messTimings: {
    breakfast: '8:00 AM – 9:30 AM',
    lunch: '1:00 PM – 2:30 PM',
    dinner: '8:00 PM – 9:30 PM',
  },
  contact: {
    address: 'Rainbow Boys Hostel, Near Campus Gate, University Road',
    phone: '+91 98765 43210',
    email: 'contact@rainbowboyshostel.com',
    hours: 'Warden Office: 9:00 AM – 8:00 PM',
  },
};

export const DEMO_USERS: UserProfile[] = [
  {
    id: 'user-resident-1',
    name: 'Rahul Sharma',
    email: 'rahul@rainbowboyshostel.com',
    phone: '9876543210',
    role: 'resident',
    roomNumber: 'Room 204',
    floor: 2,
    bedLabel: 'Bed A',
    joiningDate: '2026-08-01',
    monthlyRent: 7400,
    emergencyContact: '+91 98111 22334',
  },
  {
    id: 'user-warden-1',
    name: 'Suresh Kumar',
    email: 'warden@rainbowboyshostel.com',
    phone: '9876543211',
    role: 'warden',
  },
  {
    id: 'user-admin-1',
    name: 'Amit Yadav',
    email: 'admin@rainbowboyshostel.com',
    phone: '9876543212',
    role: 'admin',
  },
];

// Generate exactly 33 rooms across 3 floors (11 rooms per floor)
export const INITIAL_ROOMS: Room[] = Array.from({ length: 33 }, (_, index) => {
  const floor = Math.floor(index / 11) + 1;
  const roomIndex = (index % 11) + 1;
  const roomNumber = `${floor}${roomIndex < 10 ? '0' : ''}${roomIndex}`;

  // Usually vacant rooms: 3-4 rooms vacant (e.g., 309, 310, 311)
  const isVacant = index >= 30;
  const isPartiallyOccupied = index === 28 || index === 29;

  return {
    id: `room-${roomNumber}`,
    roomNumber: `Room ${roomNumber}`,
    floor,
    capacity: 2,
    type: 'Double Sharing',
    monthlyRent: 7400,
    beds: [
      {
        id: `bed-${roomNumber}-A`,
        label: 'Bed A',
        isOccupied: !isVacant,
        residentName: !isVacant ? (roomNumber === '204' ? 'Rahul Sharma' : `Resident ${roomNumber}A`) : undefined,
        residentId: !isVacant ? (roomNumber === '204' ? 'user-resident-1' : `res-${roomNumber}-a`) : undefined,
      },
      {
        id: `bed-${roomNumber}-B`,
        label: 'Bed B',
        isOccupied: !isVacant && !isPartiallyOccupied,
        residentName: !isVacant && !isPartiallyOccupied ? `Resident ${roomNumber}B` : undefined,
        residentId: !isVacant && !isPartiallyOccupied ? `res-${roomNumber}-b` : undefined,
      },
    ],
  };
});

export const INITIAL_MESS_MENU: MessMenuDay[] = [
  {
    dayEnglish: 'Monday',
    dayHindi: 'सोमवार',
    breakfast: {
      nameHindi: 'पूड़ी, सूखी सब्ज़ी, 1 कप चाय',
      nameEnglish: 'Puri, Dry Sabzi, 1 Cup Tea',
      dietary: 'veg',
    },
    lunch: {
      nameHindi: 'अरहर की दाल, चावल, सब्ज़ी, रोटी',
      nameEnglish: 'Arhar Dal, Rice, Sabzi, Roti',
      dietary: 'veg',
      notes: 'Salad & pickle included',
    },
    dinner: {
      nameHindi: '2 पीस अंडा करी, चावल, रोटी',
      nameEnglish: '2 pcs Egg Curry, Rice, Roti',
      dietary: 'egg',
      vegAlternative: {
        hindi: 'वेज के लिये कोफ़्ता',
        english: 'Veg Kofta Curry',
      },
      notes: 'Salad & pickle included',
    },
  },
  {
    dayEnglish: 'Tuesday',
    dayHindi: 'मंगलवार',
    breakfast: {
      nameHindi: 'छोला भटूरा, 1 कप चाय',
      nameEnglish: 'Chole Bhature, 1 Cup Tea',
      dietary: 'veg',
    },
    lunch: {
      nameHindi: 'चने की दाल, चावल, सब्ज़ी, रोटी',
      nameEnglish: 'Chane ki Dal, Rice, Sabzi, Roti',
      dietary: 'veg',
      notes: 'Salad & pickle included',
    },
    dinner: {
      nameHindi: 'अरहर दाल, चावल, सूखी सब्ज़ी, रोटी',
      nameEnglish: 'Arhar Dal, Rice, Dry Sabzi, Roti',
      dietary: 'veg',
      notes: 'Salad & pickle included',
    },
  },
  {
    dayEnglish: 'Wednesday',
    dayHindi: 'बुधवार',
    breakfast: {
      nameHindi: 'आलू पराठा, 1 कप चाय',
      nameEnglish: 'Aloo Paratha, 1 Cup Tea',
      dietary: 'veg',
    },
    lunch: {
      nameHindi: 'अरहर दाल, चावल, सब्ज़ी, रोटी',
      nameEnglish: 'Arhar Dal, Rice, Sabzi, Roti',
      dietary: 'veg',
      notes: 'Salad & pickle included',
    },
    dinner: {
      nameHindi: '3 पीस चिकन बिरयानी + रायता',
      nameEnglish: '3 pcs Chicken Biryani + Raita',
      dietary: 'non-veg',
      vegAlternative: {
        hindi: 'वेज के लिये वेज बिरयानी',
        english: 'Special Veg Biryani + Raita',
      },
      isSpecial: true,
      notes: 'Salad & pickle included',
    },
  },
  {
    dayEnglish: 'Thursday',
    dayHindi: 'बृहस्पतिवार',
    breakfast: {
      nameHindi: 'आलू की कचौड़ी, 1 कप चाय',
      nameEnglish: 'Aloo ki Kachori, 1 Cup Tea',
      dietary: 'veg',
    },
    lunch: {
      nameHindi: 'चने की दाल, चावल, सब्ज़ी, रोटी',
      nameEnglish: 'Chane ki Dal, Rice, Sabzi, Roti',
      dietary: 'veg',
      notes: 'Salad & pickle included',
    },
    dinner: {
      nameHindi: 'मिक्स सब्ज़ी या आलू मटर सब्ज़ी, चावल, दाल, रोटी',
      nameEnglish: 'Mix Sabzi or Aloo Matar Sabzi, Rice, Dal, Roti',
      dietary: 'veg',
      notes: 'Salad & pickle included',
    },
  },
  {
    dayEnglish: 'Friday',
    dayHindi: 'शुक्रवार',
    breakfast: {
      nameHindi: 'अंडों की भुजिया, रोटी, 1 कप चाय',
      nameEnglish: 'Egg Bhurji, Roti, 1 Cup Tea',
      dietary: 'egg',
      vegAlternative: {
        hindi: 'वेज के लिए सब्ज़ी',
        english: 'Seasonal Veg Sabzi',
      },
    },
    lunch: {
      nameHindi: 'अरहर दाल, चावल, सब्ज़ी, रोटी',
      nameEnglish: 'Arhar Dal, Rice, Sabzi, Roti',
      dietary: 'veg',
      notes: 'Salad & pickle included',
    },
    dinner: {
      nameHindi: 'पनीर, तंदूरी रोटी या पूड़ी, सूखी सब्ज़ी, पुलाव, मीठा (कस्टर्ड/काला जाम/खीर), दही बड़ा',
      nameEnglish: 'Paneer, Tandoori Roti or Puri, Dry Sabzi, Pulao, Sweet (Custard/Kala Jamun/Kheer), Dahi Vada',
      dietary: 'veg',
      isSpecial: true,
      notes: 'Grand Friday Veg Feast · Salad & pickle included',
    },
  },
  {
    dayEnglish: 'Saturday',
    dayHindi: 'शनिवार',
    breakfast: {
      nameHindi: 'कचौड़ी सब्ज़ी, 1 कप चाय',
      nameEnglish: 'Kachori Sabzi, 1 Cup Tea',
      dietary: 'veg',
    },
    lunch: {
      nameHindi: 'कढ़ी, सूखी सब्ज़ी या सब्ज़ी, चना दाल, चावल, रोटी',
      nameEnglish: 'Kadhi, Dry Sabzi or Sabzi, Chana Dal, Rice, Roti',
      dietary: 'veg',
      notes: 'Salad & pickle included',
    },
    dinner: {
      nameHindi: 'बाटी चोखा या कोफ़्ता या राजमा, चावल, रोटी',
      nameEnglish: 'Baati Chokha or Kofta or Rajma, Rice, Roti',
      dietary: 'veg',
      isSpecial: true,
      notes: 'Traditional Special Dinner · Salad & pickle included',
    },
  },
  {
    dayEnglish: 'Sunday',
    dayHindi: 'रविवार',
    breakfast: {
      nameHindi: 'जलेबी दही या कुल्चा छोला, 1 कप चाय',
      nameEnglish: 'Jalebi Dahi or Kulcha Chole, 1 Cup Tea',
      dietary: 'veg',
      isSpecial: true,
      notes: 'Weekend Breakfast Special',
    },
    lunch: {
      nameHindi: 'तहरी, रायता, पापड़ (2 पीस)',
      nameEnglish: 'Tehari, Raita, Papad (2 pcs)',
      dietary: 'veg',
      isSpecial: true,
      notes: 'Sunday Special Lunch · Salad & pickle included',
    },
    dinner: {
      nameHindi: '3 पीस चिकन, चावल, रोटी',
      nameEnglish: '3 pcs Chicken, Rice, Roti',
      dietary: 'non-veg',
      vegAlternative: {
        hindi: 'वेज के लिए पनीर',
        english: 'Special Shahi Paneer',
      },
      isSpecial: true,
      notes: 'Salad & pickle included',
    },
  },
];

export const INITIAL_PAYMENTS: Payment[] = [
  {
    id: 'pay-001',
    residentId: 'user-resident-1',
    residentName: 'Rahul Sharma',
    roomNumber: 'Room 204',
    monthYear: 'October 2026',
    amount: 7400,
    dueDate: '2026-10-05',
    paidDate: '2026-10-03',
    status: 'paid',
    paymentMethod: 'UPI',
    receiptNumber: 'RBH-2026-1004',
    notes: 'Paid via GPay UPI transaction ID 428190384112',
  },
  {
    id: 'pay-002',
    residentId: 'user-resident-1',
    residentName: 'Rahul Sharma',
    roomNumber: 'Room 204',
    monthYear: 'September 2026',
    amount: 7400,
    dueDate: '2026-09-05',
    paidDate: '2026-09-04',
    status: 'paid',
    paymentMethod: 'UPI',
    receiptNumber: 'RBH-2026-0912',
    notes: 'On-time monthly payment',
  },
  {
    id: 'pay-003',
    residentId: 'user-resident-1',
    residentName: 'Rahul Sharma',
    roomNumber: 'Room 204',
    monthYear: 'August 2026',
    amount: 7400,
    dueDate: '2026-08-05',
    paidDate: '2026-08-02',
    status: 'paid',
    paymentMethod: 'Cash',
    receiptNumber: 'RBH-2026-0801',
    notes: 'Joining rent collected at warden desk',
  },
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: 'comp-101',
    residentId: 'user-resident-1',
    residentName: 'Rahul Sharma',
    roomNumber: 'Room 204',
    category: 'Fan',
    title: 'Ceiling fan running at very low speed (capacitor issue)',
    description: 'The ceiling fan does not speed up beyond regulator level 1. Please check the capacitor or switch.',
    priority: 'normal',
    status: 'in_progress',
    createdAt: '2026-10-02T11:30:00Z',
    updatedAt: '2026-10-03T14:15:00Z',
    internalNotes: 'Hostel electrician Mr. Vinod has inspected the fan. Replacement capacitor arriving today.',
  },
  {
    id: 'comp-102',
    residentId: 'user-resident-1',
    residentName: 'Rahul Sharma',
    roomNumber: 'Room 204',
    category: 'Plumbing',
    title: 'Washbasin tap continuously dripping water',
    description: 'The main cold water tap in our floor washbasin drips even when firmly closed, wasting water.',
    priority: 'urgent',
    status: 'pending',
    createdAt: '2026-10-04T08:15:00Z',
    internalNotes: 'Queued for hostel plumber inspection.',
  },
  {
    id: 'comp-103',
    residentId: 'user-resident-1',
    residentName: 'Rahul Sharma',
    roomNumber: 'Room 204',
    category: 'Furniture',
    title: 'Study chair backrest screws loosened',
    description: 'The second study wooden chair was wobbly. Needed tightening and leveling.',
    priority: 'normal',
    status: 'resolved',
    createdAt: '2026-09-24T10:00:00Z',
    updatedAt: '2026-09-25T16:30:00Z',
    internalNotes: 'Carpenter tightened screws and replaced support rubber pad.',
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-01',
    title: 'Mess Schedule Update for Sunday Lunch',
    content: 'Special Vegetable Biryani and Paneer will be served between 1:00 PM and 2:30 PM this Sunday. All residents are requested to adhere to the dining timings.',
    category: 'Mess',
    isPinned: true,
    createdAt: '2026-10-03T09:00:00Z',
    author: 'Hostel Warden',
  },
  {
    id: 'ann-02',
    title: 'Monthly Rent Clearance Notice for October 2026',
    content: 'All residents are advised to clear their monthly rent (₹7,400) by 5th October 2026 at the management office or via UPI with official receipt confirmation.',
    category: 'Payment',
    isPinned: false,
    createdAt: '2026-10-01T10:00:00Z',
    author: 'Hostel Office',
  },
  {
    id: 'ann-03',
    title: 'Water Tank Cleaning Scheduled on Saturday Morning',
    content: 'Overhead water tank maintenance will take place on Saturday between 9:30 AM and 11:30 AM. Kindly store necessary water in advance.',
    category: 'Maintenance',
    isPinned: false,
    createdAt: '2026-09-28T16:00:00Z',
    author: 'Hostel Management',
  },
];
