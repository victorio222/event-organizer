export const rootPaths = {
  root: '/',
  pageRoot: 'pages',
  authRoot: 'auth',
  userRoot: '',
  mainRoot: '',
  errorRoot: 'error',
};

export default {
  dashboard: `/${rootPaths.pageRoot}/dashboard`,
  events: `/${rootPaths.pageRoot}/events`,
  manageEvents: `/${rootPaths.pageRoot}/manageEvents`,
  addEvent: `/${rootPaths.pageRoot}/addEvent`,
  department: `/${rootPaths.pageRoot}/department`,
  calendar: `/${rootPaths.pageRoot}/calendar`,
  notification: `/${rootPaths.pageRoot}/notification`,
  uploadPhoto: `/${rootPaths.pageRoot}/uploadPhoto`,
  uploadPhotos: `/${rootPaths.pageRoot}/uploadPhotos`,
  settings: `/${rootPaths.pageRoot}/settings`,
  manageAdmin: `/${rootPaths.pageRoot}/manageAdmin`,

  
  cancelledEvents: `/${rootPaths.pageRoot}/cancelledEvents`,
  rejectedEvents: `/${rootPaths.pageRoot}/rejectedEvents`,

  home: `/${rootPaths.userRoot}/home`,
  about: `/${rootPaths.userRoot}/photos`,
  photos: `/${rootPaths.userRoot}/about`,
  contact: `/${rootPaths.userRoot}/contact`,
  profile: `/${rootPaths.userRoot}/profile`,
  notifications: `/${rootPaths.userRoot}/notifications`,
  
  mainpage: `/${rootPaths.mainRoot}/mainpage`,

  signin: `/${rootPaths.authRoot}/signin`,
  signup: `/${rootPaths.authRoot}/signup`,
  forgotPassword: `/${rootPaths.authRoot}/forgot-password`,
  404: `/${rootPaths.errorRoot}/404`,
};
