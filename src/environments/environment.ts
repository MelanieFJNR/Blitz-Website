// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  default_language: 'fr',
  multilingual_activated: true,
  tomato_per_timeslot: 4,
  tomato_per_retreat: 20,
  url_base_api: 'https://api-dev.thesez-vous.org',
  environment_paysafe: 'TEST',
  // tslint:disable-next-line:max-line-length
  token_paysafe: 'T1QtMjM1MjAwOkItcWEyLTAtNWI4NDE0ZDYtMS0zMDJjMDIxNDEzMzhmMzEzN2FmZTgxNmUxMmE4YWJmYTk1NTVkN2VlZWQ5ZWU5ZjgwMjE0M2E1NzE5NDZjYzg3ODgwN2ZkZDU0NjkyODA1ZTg3ZjI5MjQ0ZGRiNg==',
  defaultWorkplaceId: 1,
  canHideFooter: false,
  paths_api: {
    activation: '/users/activate',
    authentication: '/authentication',
    users: '/users',
    users_export: '/users/export',
    email_confirm: '/send_email_confirm',
    organizations: '/organizations',
    organizations_export: '/organizations/export',
    domains: '/domains',
    academic_fields: '/academic_fields',
    academic_fields_export: '/academic_fields/export',
    academic_levels: '/academic_levels',
    academic_levels_export: '/academic_levels/export',
    reset_password: '/reset_password',
    change_password: '/change_password',
    activate_user: '/users/activate',
    workplaces: '/workplaces',
    workplaces_export: '/workplaces/export',
    profile: '/profile',
    time_slots: '/time_slots',
    time_slots_export: '/time_slots/export',
    time_slots_batch: '/time_slots/batch_create',
    periods: '/periods',
    periods_export: '/periods/export',
    memberships: '/memberships',
    memberships_export: '/memberships/export',
    reservationPackages: '/packages',
    reservationPackages_export: '/packages/export',
    pictures: '/pictures',
    cards: '/payment_profiles',
    orders: '/orders',
    orders_export: '/orders/export',
    orders_validate: '/orders/validate_coupon',
    orderLines_export: '/order_lines/export',
    orderLines_chartJS: '/order_lines/chartjs',
    orderLines_product_list: '/order_lines/product_list',
    reservations: '/reservations',
    reservations_export: '/reservations/export',
    custom_payments: '/custom_payments',
    retreats: '/retreat/retreats',
    retreatReservations: '/retreat/reservations',
    retreatInvitations: '/retreat/retreat_invitation',
    coupons: '/coupons',
    options_products: '/option_products',
    coupons_use_export: '/coupon_uses/export',
    retreat_waiting_queues: '/retreat/wait_queues',
    retreat_waiting_queue_notifications: '/retreat/wait_queue_notifications',
    retreat_invitation: '/retreat/retreat_invitation',
    urlCKEditorPage: '/ckeditor_page',
  }
};
