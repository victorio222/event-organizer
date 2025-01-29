// // import paths from 'routes/paths';

// export interface SubMenuItem {
//   name: string;
//   pathName: string;
//   path: string;
//   icon?: string;
//   active?: boolean;
//   items?: SubMenuItem[];
// }

// export interface MenuItem {
//   id: string;
//   subheader: string;
//   path?: string;
//   icon?: string;
//   avatar?: string;
//   active?: boolean;
//   items?: SubMenuItem[];
// }

// const sitemap: MenuItem[] = [
//   {
//     id: 'dashboard',
//     subheader: 'Dashboard',
//     path: '/',
//     icon: 'ri:dashboard-fill',
//     active: true,
//   },
//   {
//     id: 'events',
//     subheader: 'Events',
//     icon: 'ic:baseline-calendar-today',
//     // active: true,
//     items: [
//       {
//         name: 'Manage Events ADMIN',
//         pathName: 'manageEvents',
//         path: '/manageEvents',
//       },
//       {
//         name: 'Manage Events',
//         pathName: 'events',
//         path: '/events',
//       },
//       {
//         name: 'Add Events',
//         pathName: 'addEvent',
//         path: '/addEvent',
//       },
//     ],
//   },
//   {
//     id: 'department',
//     subheader: 'Departments',
//     path: '/department',
//     icon: 'fa6-solid:building',
//   },
//   {
//     id: 'calendar',
//     subheader: 'Calendar',
//     path: '/calendar',
//     icon: 'ic:baseline-calendar-month',
//   },
//   {
//     id: 'uploadPhotos',
//     subheader: 'Upload Photos',
//     path: '/uploadPhoto',
//     icon: 'ic:round-add-to-photos',
//   },
//   {
//     id: 'settings',
//     subheader: 'Account Settings',
//     path: '/account-settings',
//     icon: 'ic:outline-settings',
//   },{
//     id: 'manageAdmin',
//     subheader: 'Manage Admin',
//     path: '/manageAdmin',
//     icon: 'ic:outline-settings',
//   },
// ];

// export default sitemap;



// import paths from 'routes/paths';

export interface SubMenuItem {
  name: string;
  pathName: string;
  path: string;
  icon?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

export interface MenuItem {
  id: string;
  subheader: string;
  path?: string;
  icon?: string;
  avatar?: string;
  active?: boolean;
  items?: SubMenuItem[];
}

type UserRole = 'MainAdmin' | 'Admin'; // Define valid role types

const sitemap = (role: UserRole): MenuItem[] => {
  const mainAdminOnlyItems: MenuItem[] = [
    {
      id: 'manageAdmin',
      subheader: 'Manage Admin',
      path: '/manageAdmin',
      icon: 'solar:shield-user-bold',
    },
  ];

  const commonItems: MenuItem[] = [
    {
      id: 'dashboard',
      subheader: 'Dashboard',
      path: '/',
      icon: 'ri:dashboard-fill',
    },
    {
      id: 'events',
      subheader: 'Events',
      icon: 'ic:baseline-calendar-today',
      // items: [
      //   {
      //     name: 'Manage Events ADMIN',
      //     pathName: 'manageEvents',
      //     path: '/manageEvents',
      //   },
      //   {
      //     name: 'Manage Events',
      //     pathName: 'events',
      //     path: '/events',
      //   },
      //   {
      //     name: 'Add Events',
      //     pathName: 'addEvent',
      //     path: '/addEvent',
      //   },
      // ],

      items: [
        role === 'MainAdmin' && {
          name: 'Manage Events',
          pathName: 'manageEvents',
          path: '/manageEvents',
        },
        role === 'Admin' && {
          name: 'Manage Events',
          pathName: 'events',
          path: '/events',
        },
        {
          name: 'Add Events',
          pathName: 'addEvent',
          path: '/addEvent',
        },
        {
          name: 'Cancelled Events',
          pathName: 'cancelled-events',
          path: '/cancelled-events',
        },
        {
          name: 'Rejected Events',
          pathName: 'rejected-events',
          path: '/rejected-events',
        },
      ].filter(Boolean) as SubMenuItem[],
    },
    // {
    //   id: 'department',
    //   subheader: 'Departments',
    //   path: '/department',
    //   icon: 'fa6-solid:building',
    // },
    ...(role === 'MainAdmin'
      ? [
          {
            id: 'department',
            subheader: 'Departments',
            path: '/department',
            icon: 'fa6-solid:building',
          },
        ]
      : []),
    // {
    //   id: 'calendar',
    //   subheader: 'Calendar',
    //   path: '/calendar',
    //   icon: 'ic:baseline-calendar-month',
    // },
    {
      id: 'uploadPhotos',
      subheader: 'Upload Photos',
      path: '/uploadPhoto',
      icon: 'ic:round-add-to-photos',
    },
    {
      id: 'settings',
      subheader: 'Account Settings',
      path: '/account-settings',
      icon: 'ic:outline-settings',
    },
  ];

  return role === 'MainAdmin' ? [...commonItems, ...mainAdminOnlyItems] : commonItems;
};

export default sitemap;