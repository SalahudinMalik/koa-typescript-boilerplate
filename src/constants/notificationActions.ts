const NT = {
  APPLICATION: {
    NEW: 1,
    STATUS_UPDATE: 3,
    NOTE_ADDED: 8,
    RATING_CHANGE: 9,
  },

  BEHAVIOURAL_BENCHMARK: {
    CREATED: 12,
  },

  CALENDAR: {
    INVITE: 11,
  },

  CANDIDATE: {
    COMMUNICATION: 4,
    REQUEST_COMPLETED: 5,
    INTERVIEW_ACCEPTANCE: 6,
    EMAIL_RECEIVED: 7,
    SIGN_UP: 30,
    DOCUMENT: {
      ADD: 31,
    },
  },

  JOB: {
    NEW: 10,
    NEW_NOTE: 13,
    INVITE: 14,
    APPROVAL: {
      ACCEPTED: 15,
      REJECTED: 16,
      COMPLETED: 17, // all approvers approved/rejected the advert
    },
  },

  PORTAL: {
    EMAIL_RECEIVED: 2,
    COMPANY_EMAIL_RECEIVED: 32,
  },

  LICENCE: {
    EXPIRY_REMINDER: 18,
    EXPIRED: 19,
    SCHEDULED_PAYMENT_REMINDER: 20,
    PAYMENT_CHARGED: 21,
    RENEWED: 22,
    ACTIVATION: 23,
    PAYMENT_FAILED: 24,
  },
  COMPANY: {
    NOTICE: 28,
    DATA_CHANGE: 25,
  },
  PRODUCT: {
    EXPIRY_REMINDER: 27,
    EXPIRED: 26,
  },
  PARTNER: {
    CLIENT_SIGN_UP: 32,
    JOB: {
      ADVERTISE: 33,
    },
  },
  ISV: {
    RESULT: 34,
  },
};

/**
 * default notification actions if not defined in notifications settings
 * If you add a new notification type, you need to add a setting here also
 */
const NT_ACTIONS = [
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.APPLICATION.NEW,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 2,
    notificationtype: NT.APPLICATION.STATUS_UPDATE,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 0,
    notificationtype: NT.APPLICATION.NOTE_ADDED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 0,
    notificationtype: NT.APPLICATION.RATING_CHANGE,
  },

  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: -1,
    notificationtype: NT.BEHAVIOURAL_BENCHMARK.CREATED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.CALENDAR.INVITE,
  },

  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: -1,
    notificationtype: NT.CANDIDATE.COMMUNICATION,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: -1,
    notificationtype: NT.CANDIDATE.REQUEST_COMPLETED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 0,
    notificationtype: NT.CANDIDATE.INTERVIEW_ACCEPTANCE,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: -1,
    notificationtype: NT.CANDIDATE.EMAIL_RECEIVED,
  },

  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.CANDIDATE.DOCUMENT.ADD,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.JOB.NEW,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 2,
    notificationtype: NT.JOB.APPROVAL.ACCEPTED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 2,
    notificationtype: NT.JOB.APPROVAL.REJECTED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.JOB.APPROVAL.COMPLETED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 2,
    notificationtype: NT.JOB.NEW_NOTE,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 2,
    notificationtype: NT.JOB.INVITE,
  },

  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.LICENCE.EXPIRY_REMINDER,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.LICENCE.EXPIRED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.LICENCE.SCHEDULED_PAYMENT_REMINDER,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.LICENCE.PAYMENT_CHARGED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.LICENCE.RENEWED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.LICENCE.ACTIVATION,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.LICENCE.PAYMENT_FAILED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: -1,
    notificationtype: NT.COMPANY.DATA_CHANGE,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.COMPANY.NOTICE,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: -1,
    notificationtype: NT.PRODUCT.EXPIRY_REMINDER,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: -1,
    notificationtype: NT.PRODUCT.EXPIRED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.PARTNER.CLIENT_SIGN_UP,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: -1,
    notificationtype: NT.PARTNER.JOB.ADVERTISE,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: 1,
    notificationtype: NT.CANDIDATE.SIGN_UP,
  },
  {
    status_id: 2,
    portal_notifications: false,
    email_notifications: 0,
    notificationtype: NT.PORTAL.COMPANY_EMAIL_RECEIVED,
  },
  {
    status_id: 2,
    portal_notifications: true,
    email_notifications: -1,
    notificationtype: NT.ISV.RESULT,
  },
];

export {
  NT,
  NT_ACTIONS,
};
