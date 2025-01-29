interface RowsProps {
  id: number | string;
  category: string;
  date: string;
  eventName: string;
  time: string;
  status: string;
  location: string;
}

export const rows: RowsProps[] = [
  {
    id: 1001,
    category: 'Concert',
    date: '2024-08-20',
    eventName: 'Rock Concert at Central Park',
    time: '7:00 PM',
    location: 'Central Park, New York',
    status: 'Approved',
  },
  {
    id: 1002,
    category: 'Workshop',
    date: '2024-08-21',
    eventName: 'Photography Workshop for Beginners',
    time: '10:00 AM',
    location: 'Downtown Community Center, Los Angeles',
    status: 'Pending',
  },
  {
    id: 1003,
    category: 'Conference',
    date: '2024-08-22',
    eventName: 'Tech Innovations Conference 2024',
    time: '9:00 AM',
    location: 'Silicon Valley Convention Center, San Francisco',
    status: 'Approved',
  },
  {
    id: 1004,
    category: 'Exhibition',
    date: '2024-08-23',
    eventName: 'Modern Art Exhibition',
    time: '12:00 PM',
    location: 'Museum of Modern Art, Chicago',
    status: 'Approved',
  },
  {
    id: 1005,
    category: 'Festival',
    date: '2024-08-24',
    eventName: 'Food and Drink Festival',
    time: '2:00 PM',
    location: 'Riverfront Park, Austin',
    status: 'Declined',
  },
  {
    id: 1006,
    category: 'Sports',
    date: '2024-08-25',
    eventName: 'Basketball Tournament Finals',
    time: '5:00 PM',
    location: 'Sports Arena, Boston',
    status: 'Approved',
  },
  {
    id: 1007,
    category: 'Seminar',
    date: '2024-08-26',
    eventName: 'Financial Planning Seminar',
    time: '8:00 AM',
    location: 'City Conference Hall, Miami',
    status: 'Approved',
  },
  {
    id: 1008,
    category: 'Charity Event',
    date: '2024-08-27',
    eventName: 'Charity Auction for Animal Welfare',
    time: '6:00 PM',
    location: 'Grand Ballroom, Los Angeles',
    status: 'Approved',
  },
  {
    id: 1009,
    category: 'Webinar',
    date: '2024-08-28',
    eventName: 'Marketing Strategies for 2024',
    time: '11:00 AM',
    location: 'Online (Zoom)',
    status: 'Pending',
  },
  {
    id: 1010,
    category: 'Networking Event',
    date: '2024-08-29',
    eventName: 'Business Networking Mixer',
    time: '5:30 PM',
    location: 'Downtown Rooftop, New York',
    status: 'Approved',
  },
  {
    id: 1011,
    category: 'Award Ceremony',
    date: '2024-08-30',
    eventName: 'Annual Leadership Awards',
    time: '8:00 PM',
    location: 'City Theatre, Los Angeles',
    status: 'Approved',
  },
  {
    id: 1012,
    category: 'Meetup',
    date: '2024-08-31',
    eventName: 'Tech Enthusiasts Meetup',
    time: '3:00 PM',
    location: 'Tech Hub, San Francisco',
    status: 'Approved',
  },
];

