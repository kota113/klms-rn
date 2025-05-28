# API Documentation

## Available Endpoints

### Access Tokens

Path: `/access_tokens.json`

- **GET** /v1/users/{user_id}/tokens/{id}
    - Description: Show an access token
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/users/{user_id}/tokens
    - Description: Create an access token
    - Parameters:
        - user_id (path, required): ID
        - token[purpose] (form, required): The purpose of the token.
        - token[expires_at] (form, optional): The time at which the token will expire.
        - token[scopes] (form, optional): The scopes to associate with the token.

- **PUT** /v1/users/{user_id}/tokens/{id}
    - Description: Update an access token
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID
        - token[purpose] (form, optional): The purpose of the token.
        - token[expires_at] (form, optional): The time at which the token will expire.
        - token[scopes] (form, optional): The scopes to associate with the token.
        - token[regenerate] (form, optional): Regenerate the actual token.

- **DELETE** /v1/users/{user_id}/tokens/{id}
    - Description: Delete an access token
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID

### Account Calendars

Path: `/account_calendars.json`

- **GET** /v1/account_calendars
    - Description: List available account calendars
    - Parameters:
        - search_term (query, optional): When included, searches available account calendars for the term. Returns
          matching
          results. Term must be at least 2 characters.

- **GET** /v1/account_calendars/{account_id}
    - Description: Get a single account calendar
    - Parameters:
        - account_id (path, required): ID

- **PUT** /v1/account_calendars/{account_id}
    - Description: Update a calendar
    - Parameters:
        - account_id (path, required): ID
        - visible (form, optional): Allow administrators with `manage_account_calendar_events` permission
          to create events on this calendar, and allow users to view this
          calendar and its events.
        - auto_subscribe (form, optional): When true, users will automatically see events from this account in their
          calendar, even if they haven't manually added that calendar.

- **PUT** /v1/accounts/{account_id}/account_calendars
    - Description: Update several calendars
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/accounts/{account_id}/account_calendars
    - Description: List all account calendars
    - Parameters:
        - account_id (path, required): ID
        - search_term (query, optional): When included, searches all descendent accounts of provided account for the
          term. Returns matching results. Term must be at least 2 characters. Can be
          combined with a filter value.
        - filter (query, optional): When included, only returns calendars that are either visible or hidden. Can
          be combined with a search term.

- **GET** /v1/accounts/{account_id}/visible_calendars_count
    - Description: Count of all visible account calendars
    - Parameters:
        - account_id (path, required): ID

### Account Notifications

Path: `/account_notifications.json`

- **GET** /v1/accounts/{account_id}/account_notifications
    - Description: Index of active global notification for the user
    - Parameters:
        - account_id (path, required): ID
        - include_past (query, optional): Include past and dismissed global announcements.
        - include_all (query, optional): Include all global announcements, regardless of user's role. Only available to
          account admins.

- **GET** /v1/accounts/{account_id}/account_notifications/{id}
    - Description: Show a global notification
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/accounts/{account_id}/account_notifications/{id}
    - Description: Close notification for user
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/accounts/{account_id}/account_notifications
    - Description: Create a global notification
    - Parameters:
        - account_id (path, required): ID
        - account_notification[subject] (form, required): The subject of the notification.
        - account_notification[message] (form, required): The message body of the notification.
        - account_notification[start_at] (form, required): The start date and time of the notification in ISO8601
          format.
          e.g. 2014-01-01T01:00Z
        - account_notification[end_at] (form, required): The end date and time of the notification in ISO8601 format.
          e.g. 2014-01-01T01:00Z
        - account_notification[icon] (form, optional): The icon to display with the notification.
          Note: Defaults to warning.
        - account_notification_roles (form, optional): The role(s) to send global notification to. Note:  ommitting this
          field will send to everyone
          Example:
          account_notification_roles: ["StudentEnrollment", "TeacherEnrollment"]

- **PUT** /v1/accounts/{account_id}/account_notifications/{id}
    - Description: Update a global notification
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - account_notification[subject] (form, optional): The subject of the notification.
        - account_notification[message] (form, optional): The message body of the notification.
        - account_notification[start_at] (form, optional): The start date and time of the notification in ISO8601
          format.
          e.g. 2014-01-01T01:00Z
        - account_notification[end_at] (form, optional): The end date and time of the notification in ISO8601 format.
          e.g. 2014-01-01T01:00Z
        - account_notification[icon] (form, optional): The icon to display with the notification.
        - account_notification_roles (form, optional): The role(s) to send global notification to. Note:  ommitting this
          field will send to everyone
          Example:
          account_notification_roles: ["StudentEnrollment", "TeacherEnrollment"]

### Account Reports

Path: `/account_reports.json`

- **GET** /v1/accounts/{account_id}/reports
    - Description: List Available Reports
    - Parameters:
        - account_id (path, required): ID

- **POST** /v1/accounts/{account_id}/reports/{report}
    - Description: Start a Report
    - Parameters:
        - account_id (path, required): ID
        - report (path, required): ID
        - parameters (form, optional): The parameters will vary for each report. To fetch a list
          of available parameters for each report, see {api:AccountReportsController#available_reports List Available
          Reports}.
          A few example parameters have been provided below. Note that the example
          parameters provided below may not be valid for every report.
        - parameters[skip_message] (form, optional): If true, no message will be sent
          to the user upon completion of the report.
        - parameters[course_id] (form, optional): The id of the course to report on.
          Note: this parameter has been listed to serve as an example and may not be
          valid for every report.
        - parameters[users] (form, optional): If true, user data will be included. If
          false, user data will be omitted. Note: this parameter has been listed to
          serve as an example and may not be valid for every report.

- **GET** /v1/accounts/{account_id}/reports/{report}
    - Description: Index of Reports
    - Parameters:
        - account_id (path, required): ID
        - report (path, required): ID

- **GET** /v1/accounts/{account_id}/reports/{report}/{id}
    - Description: Status of a Report
    - Parameters:
        - account_id (path, required): ID
        - report (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/accounts/{account_id}/reports/{report}/{id}
    - Description: Delete a Report
    - Parameters:
        - account_id (path, required): ID
        - report (path, required): ID
        - id (path, required): ID

### Accounts

Path: `/accounts.json`

- **GET** /v1/accounts
    - Description: List accounts
    - Parameters:
        - include (query, optional): Array of additional information to include.

"lti_guid":: the 'tool_consumer_instance_guid' that will be sent for this account on LTI launches
"registration_settings":: returns info about the privacy policy and terms of use
"services":: returns services and whether they are enabled (requires account management permissions)
"course_count":: returns the number of courses directly under each account
"sub_account_count":: returns the number of sub-accounts directly under each account

- **GET** /v1/manageable_accounts
    - Description: Get accounts that admins can manage

- **GET** /v1/course_creation_accounts
    - Description: Get accounts that users can create courses in

- **GET** /v1/course_accounts
    - Description: List accounts for course admins

- **GET** /v1/accounts/{id}
    - Description: Get a single account
    - Parameters:
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/settings
    - Description: Settings
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/settings/environment
    - Description: List environment settings

- **GET** /v1/accounts/{account_id}/permissions
    - Description: Permissions
    - Parameters:
        - account_id (path, required): ID
        - permissions (query, optional): List of permissions to check against the authenticated user.
          Permission names are documented in the {api:RoleOverridesController#add_role Create a role} endpoint.

- **GET** /v1/accounts/{account_id}/sub_accounts
    - Description: Get the sub-accounts of an account
    - Parameters:
        - account_id (path, required): ID
        - recursive (query, optional): If true, the entire account tree underneath
          this account will be returned (though still paginated). If false, only
          direct sub-accounts of this account will be returned. Defaults to false.
        - include (query, optional): Array of additional information to include.

"course_count":: returns the number of courses directly under each account
"sub_account_count":: returns the number of sub-accounts directly under each account

- **GET** /v1/accounts/{account_id}/terms_of_service
    - Description: Get the Terms of Service
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/accounts/{account_id}/help_links
    - Description: Get help links
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/manually_created_courses_account
    - Description: Get the manually-created courses sub-account for the domain root account

- **GET** /v1/accounts/{account_id}/courses
    - Description: List active courses in an account
    - Parameters:
        - account_id (path, required): ID
        - with_enrollments (query, optional): If true, include only courses with at least one enrollment. If false,
          include only courses with no enrollments. If not present, do not filter
          on course enrollment status.
        - enrollment_type (query, optional): If set, only return courses that have at least one user enrolled in
          in the course with one of the specified enrollment types.
        - published (query, optional): If true, include only published courses. If false, exclude published
          courses. If not present, do not filter on published status.
        - completed (query, optional): If true, include only completed courses (these may be in state
          'completed', or their enrollment term may have ended). If false, exclude
          completed courses. If not present, do not filter on completed status.
        - blueprint (query, optional): If true, include only blueprint courses. If false, exclude them.
          If not present, do not filter on this basis.
        - blueprint_associated (query, optional): If true, include only courses that inherit content from a blueprint
          course.
          If false, exclude them. If not present, do not filter on this basis.
        - public (query, optional): If true, include only public courses. If false, exclude them.
          If not present, do not filter on this basis.
        - by_teachers (query, optional): List of User IDs of teachers; if supplied, include only courses taught by
          one of the referenced users.
        - by_subaccounts (query, optional): List of Account IDs; if supplied, include only courses associated with one
          of the referenced subaccounts.
        - hide_enrollmentless_courses (query, optional): If present, only return courses that have at least one
          enrollment.
          Equivalent to 'with_enrollments=true'; retained for compatibility.
        - state (query, optional): If set, only return courses that are in the given state(s). By default,
          all states but "deleted" are returned.
        - enrollment_term_id (query, optional): If set, only includes courses from the specified term.
        - search_term (query, optional): The partial course name, code, or full ID to match and return in the results
          list. Must be at least 3 characters.
        - include (query, optional): - All explanations can be seen in the {api:CoursesController#index Course API index
          documentation}
- "sections", "needs_grading_count" and "total_scores" are not valid options at the account level
    - sort (query, optional): The column to sort results by.
    - order (query, optional): The order to sort the given column by.
    - search_by (query, optional): The filter to search by. "course" searches for course names, course codes,
      and SIS IDs. "teacher" searches for teacher names
    - starts_before (query, optional): If set, only return courses that start before the value (inclusive)
      or their enrollment term starts before the value (inclusive)
      or both the course's start_at and the enrollment term's start_at are set to null.
      The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
    - ends_after (query, optional): If set, only return courses that end after the value (inclusive)
      or their enrollment term ends after the value (inclusive)
      or both the course's end_at and the enrollment term's end_at are set to null.
      The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
    - homeroom (query, optional): If set, only return homeroom courses.

- **PUT** /v1/accounts/{id}
    - Description: Update an account
    - Parameters:
        - id (path, required): ID
        - account[name] (form, optional): Updates the account name
        - account[sis_account_id] (form, optional): Updates the account sis_account_id
          Must have manage_sis permission and must not be a root_account.
        - account[default_time_zone] (form, optional): The default time zone of the account. Allowed time zones are
          {http://www.iana.org/time-zones IANA time zones} or friendlier
          {http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html Ruby on Rails time zones}.
        - account[default_storage_quota_mb] (form, optional): The default course storage quota to be used, if not
          otherwise specified.
        - account[default_user_storage_quota_mb] (form, optional): The default user storage quota to be used, if not
          otherwise specified.
        - account[default_group_storage_quota_mb] (form, optional): The default group storage quota to be used, if not
          otherwise specified.
        - account[course_template_id] (form, optional): The ID of a course to be used as a template for all newly
          created courses.
          Empty means to inherit the setting from parent account, 0 means to not
          use a template even if a parent account has one set. The course must be
          marked as a template.
        - account[parent_account_id] (form, optional): The ID of a parent account to move the account to. The new parent
          account
          must be in the same root account as the original. The hierarchy of
          sub-accounts will be preserved in the new parent account. The caller must
          be an administrator in both the original parent account and the new parent
          account.
        - account[settings][restrict_student_past_view][value] (form, optional): Restrict students from viewing courses
          after end date
        - account[settings][restrict_student_past_view][locked] (form, optional): Lock this setting for sub-accounts and
          courses
        - account[settings][restrict_student_future_view][value] (form, optional): Restrict students from viewing
          courses before start date
        - account[settings][microsoft_sync_enabled] (form, optional): Determines whether this account has Microsoft
          Teams Sync enabled or not.

Note that if you are altering Microsoft Teams sync settings you must enable
the Microsoft Group enrollment syncing feature flag. In addition, if you are enabling
Microsoft Teams sync, you must also specify a tenant, login attribute, and a remote attribute.
Specifying a suffix to use is optional.
- account[settings][microsoft_sync_tenant] (form, optional): The tenant this account should use when using Microsoft
Teams Sync.
This should be an Azure Active Directory domain name.
- account[settings][microsoft_sync_login_attribute] (form, optional): The attribute this account should use to lookup
users when using Microsoft Teams Sync.
Must be one of "sub", "email", "oid", "preferred_username", or "integration_id".
- account[settings][microsoft_sync_login_attribute_suffix] (form, optional): A suffix that will be appended to the
result of the login attribute when associating
Canvas users with Microsoft users. Must be under 255 characters and contain no whitespace.
This field is optional.
- account[settings][microsoft_sync_remote_attribute] (form, optional): The Active Directory attribute to use when
associating Canvas users with Microsoft users.
Must be one of "mail", "mailNickname", or "userPrincipalName".
- account[settings][restrict_student_future_view][locked] (form, optional): Lock this setting for sub-accounts and
courses
- account[settings][lock_all_announcements][value] (form, optional): Disable comments on announcements
- account[settings][lock_all_announcements][locked] (form, optional): Lock this setting for sub-accounts and courses
- account[settings][usage_rights_required][value] (form, optional): Copyright and license information must be provided
for files before they are published.
- account[settings][usage_rights_required][locked] (form, optional): Lock this setting for sub-accounts and courses
- account[settings][restrict_student_future_listing][value] (form, optional): Restrict students from viewing future
enrollments in course list
- account[settings][restrict_student_future_listing][locked] (form, optional): Lock this setting for sub-accounts and
courses
- account[settings][conditional_release][value] (form, optional): Enable or disable individual learning paths for
students based on assessment
- account[settings][conditional_release][locked] (form, optional): Lock this setting for sub-accounts and courses
- account[settings][password_policy] (form, optional): Hash of optional password policy configuration parameters for a
root account

+allow_login_suspension+ boolean:: Allow suspension of user logins upon reaching maximum_login_attempts

+require_number_characters+ boolean:: Require the use of number characters when setting up a new password

+require_symbol_characters+ boolean:: Require the use of symbol characters when setting up a new password

+minimum_character_length+ integer:: Minimum number of characters required for a new password

+maximum_login_attempts+ integer:: Maximum number of login attempts before a user is locked out

_Required_ feature option:
Enhance password options
- account[settings][enable_as_k5_account][value] (form, optional): Enable or disable Canvas for Elementary for this
account
- account[settings][use_classic_font_in_k5][value] (form, optional): Whether or not the classic font is used on the
dashboard. Only applies if enable_as_k5_account is true.
- override_sis_stickiness (form, optional): Default is true. If false, any fields containing “sticky” changes will not
be updated.
See SIS CSV Format documentation for information on which fields can have SIS stickiness
- account[settings][lock_outcome_proficiency][value] (form, optional): [DEPRECATED] Restrict instructors from changing
mastery scale
- account[lock_outcome_proficiency][locked] (form, optional): [DEPRECATED] Lock this setting for sub-accounts and
courses
- account[settings][lock_proficiency_calculation][value] (form, optional): [DEPRECATED] Restrict instructors from
changing proficiency calculation method
- account[lock_proficiency_calculation][locked] (form, optional): [DEPRECATED] Lock this setting for sub-accounts and
courses
- account[services] (form, optional): Give this a set of keys and boolean values to enable or disable services matching
the keys

- **DELETE** /v1/accounts/{account_id}/users/{user_id}
    - Description: Delete a user from the root account
    - Parameters:
        - account_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/accounts/{account_id}/users/{user_id}/restore
    - Description: Restore a deleted user from a root account
    - Parameters:
        - account_id (path, required): ID
        - user_id (path, required): ID

- **POST** /v1/accounts/{account_id}/sub_accounts
    - Description: Create a new sub-account
    - Parameters:
        - account_id (path, required): ID
        - account[name] (form, required): The name of the new sub-account.
        - account[sis_account_id] (form, optional): The account's identifier in the Student Information System.
        - account[default_storage_quota_mb] (form, optional): The default course storage quota to be used, if not
          otherwise specified.
        - account[default_user_storage_quota_mb] (form, optional): The default user storage quota to be used, if not
          otherwise specified.
        - account[default_group_storage_quota_mb] (form, optional): The default group storage quota to be used, if not
          otherwise specified.

- **DELETE** /v1/accounts/{account_id}/sub_accounts/{id}
    - Description: Delete a sub-account
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

### Accounts (LTI)

Path: `/accounts_(lti).json`

- **GET** /lti/accounts/{account_id}
    - Description: Get account
    - Parameters:
        - account_id (path, required): ID

### Admins

Path: `/admins.json`

- **POST** /v1/accounts/{account_id}/admins
    - Description: Make an account admin
    - Parameters:
        - account_id (path, required): ID
        - user_id (form, required): The id of the user to promote.
        - role (form, optional): [DEPRECATED] The user's admin relationship with the account will be
          created with the given role. Defaults to 'AccountAdmin'.
        - role_id (form, optional): The user's admin relationship with the account will be created with the given role.
          Defaults to the built-in role for 'AccountAdmin'.
        - send_confirmation (form, optional): Send a notification email to
          the new admin if true. Default is true.

- **DELETE** /v1/accounts/{account_id}/admins/{user_id}
    - Description: Remove account admin
    - Parameters:
        - account_id (path, required): ID
        - user_id (path, required): ID
        - role (query, optional): [DEPRECATED] Account role to remove from the user.
        - role_id (query, required): The id of the role representing the user's admin relationship with the account.

- **GET** /v1/accounts/{account_id}/admins
    - Description: List account admins
    - Parameters:
        - account_id (path, required): ID
        - user_id (query, optional): Scope the results to those with user IDs equal to any of the IDs specified here.

- **GET** /v1/accounts/{account_id}/admins/self
    - Description: List my admin roles
    - Parameters:
        - account_id (path, required): ID

### Analytics

Path: `/analytics.json`

- **GET** /v1/accounts/{account_id}/analytics/terms/{term_id}/activity
    - Description: Get department-level participation data
    - Parameters:
        - account_id (path, required): ID
        - term_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/current/activity
    - Description: Get department-level participation data
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/completed/activity
    - Description: Get department-level participation data
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/terms/{term_id}/grades
    - Description: Get department-level grade data
    - Parameters:
        - account_id (path, required): ID
        - term_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/current/grades
    - Description: Get department-level grade data
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/completed/grades
    - Description: Get department-level grade data
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/terms/{term_id}/statistics
    - Description: Get department-level statistics
    - Parameters:
        - account_id (path, required): ID
        - term_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/current/statistics
    - Description: Get department-level statistics
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/completed/statistics
    - Description: Get department-level statistics
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/terms/{term_id}/statistics_by_subaccount
    - Description: Get department-level statistics, broken down by subaccount
    - Parameters:
        - account_id (path, required): ID
        - term_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/current/statistics_by_subaccount
    - Description: Get department-level statistics, broken down by subaccount
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/accounts/{account_id}/analytics/completed/statistics_by_subaccount
    - Description: Get department-level statistics, broken down by subaccount
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/analytics/activity
    - Description: Get course-level participation data
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/analytics/assignments
    - Description: Get course-level assignment data
    - Parameters:
        - course_id (path, required): ID
        - async (query, optional): If async is true, then the course_assignments call can happen asynch-
          ronously and MAY return a response containing a progress_url key instead
          of an assignments array. If it does, then it is the caller's
          responsibility to poll the API again to see if the progress is complete.
          If the data is ready (possibly even on the first async call) then it
          will be passed back normally, as documented in the example response.

- **GET** /v1/courses/{course_id}/analytics/student_summaries
    - Description: Get course-level student summary data
    - Parameters:
        - course_id (path, required): ID
        - sort_column (query, optional): The order results in which results are returned. Defaults to "name".
        - student_id (query, optional): If set, returns only the specified student.

- **GET** /v1/courses/{course_id}/analytics/users/{student_id}/activity
    - Description: Get user-in-a-course-level participation data
    - Parameters:
        - course_id (path, required): ID
        - student_id (path, required): ID

- **GET** /v1/courses/{course_id}/analytics/users/{student_id}/assignments
    - Description: Get user-in-a-course-level assignment data
    - Parameters:
        - course_id (path, required): ID
        - student_id (path, required): ID

- **GET** /v1/courses/{course_id}/analytics/users/{student_id}/communication
    - Description: Get user-in-a-course-level messaging data
    - Parameters:
        - course_id (path, required): ID
        - student_id (path, required): ID

### Announcement External Feeds

Path: `/announcement_external_feeds.json`

- **GET** /v1/courses/{course_id}/external_feeds
    - Description: List external feeds
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/external_feeds
    - Description: List external feeds
    - Parameters:
        - group_id (path, required): ID

- **POST** /v1/courses/{course_id}/external_feeds
    - Description: Create an external feed
    - Parameters:
        - course_id (path, required): ID
        - url (form, required): The url to the external rss or atom feed
        - header_match (form, optional): If given, only feed entries that contain this string in their title will be
          imported
        - verbosity (form, optional): Defaults to "full"

- **POST** /v1/groups/{group_id}/external_feeds
    - Description: Create an external feed
    - Parameters:
        - group_id (path, required): ID
        - url (form, required): The url to the external rss or atom feed
        - header_match (form, optional): If given, only feed entries that contain this string in their title will be
          imported
        - verbosity (form, optional): Defaults to "full"

- **DELETE** /v1/courses/{course_id}/external_feeds/{external_feed_id}
    - Description: Delete an external feed
    - Parameters:
        - course_id (path, required): ID
        - external_feed_id (path, required): ID

- **DELETE** /v1/groups/{group_id}/external_feeds/{external_feed_id}
    - Description: Delete an external feed
    - Parameters:
        - group_id (path, required): ID
        - external_feed_id (path, required): ID

### Announcements

Path: `/announcements.json`

- **GET** /v1/announcements
    - Description: List announcements
    - Parameters:
        - context_codes (query, required): List of context_codes to retrieve announcements for (for example,
          +course_123+). Only courses
          are presently supported. The call will fail unless the caller has View Announcements permission
          in all listed courses.
        - start_date (query, optional): Only return announcements posted since the start_date (inclusive).
          Defaults to 14 days ago. The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - end_date (query, optional): Only return announcements posted before the end_date (inclusive).
          Defaults to 28 days from start_date. The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:
          MM:SSZ.
          Announcements scheduled for future posting will only be returned to course administrators.
        - active_only (query, optional): Only return active announcements that have been published.
          Applies only to requesting users that have permission to view
          unpublished items.
          Defaults to false for users with access to view unpublished items,
          otherwise true and unmodifiable.
        - latest_only (query, optional): Only return the latest announcement for each associated context.
          The response will include at most one announcement for each
          specified context in the context_codes[] parameter.
          Defaults to false.
        - include (query, optional): Optional list of resources to include with the response. May include
          a string of the name of the resource. Possible values are:
          "sections", "sections_user_count"
          if "sections" is passed, includes the course sections that are associated
          with the topic, if the topic is specific to certain sections of the course.
          If "sections_user_count" is passed, then:
          (a) If sections were asked for *and* the topic is specific to certain
          course sections sections, includes the number of users in each
          section. (as part of the section json asked for above)
          (b) Else, includes at the root level the total number of users in the
          topic's context (group or course) that the topic applies to.

### API Token Scopes

Path: `/api_token_scopes.json`

- **GET** /v1/accounts/{account_id}/scopes
    - Description: List scopes
    - Parameters:
        - account_id (path, required): ID
        - group_by (query, optional): The attribute to group the scopes by. By default no grouping is done.

### Appointment Groups

Path: `/appointment_groups.json`

- **GET** /v1/appointment_groups
    - Description: List appointment groups
    - Parameters:
        - scope (query, optional): Defaults to "reservable"
        - context_codes (query, optional): Array of context codes used to limit returned results.
        - include_past_appointments (query, optional): Defaults to false. If true, includes past appointment groups
        - include (query, optional): Array of additional information to include.

"appointments":: calendar event time slots for this appointment group
"child_events":: reservations of those time slots
"participant_count":: number of reservations
"reserved_times":: the event id, start time and end time of reservations
the current user has made)
"all_context_codes":: all context codes associated with this appointment group

- **POST** /v1/appointment_groups
    - Description: Create an appointment group
    - Parameters:
        - appointment_group[context_codes] (form, required): Array of context codes (courses, e.g. course_1) this group
          should be
          linked to (1 or more). Users in the course(s) with appropriate permissions
          will be able to sign up for this appointment group.
        - appointment_group[sub_context_codes] (form, optional): Array of sub context codes (course sections or a single
          group category)
          this group should be linked to. Used to limit the appointment group to
          particular sections. If a group category is specified, students will sign
          up in groups and the participant_type will be "Group" instead of "User".
        - appointment_group[title] (form, required): Short title for the appointment group.
        - appointment_group[description] (form, optional): Longer text description of the appointment group.
        - appointment_group[location_name] (form, optional): Location name of the appointment group.
        - appointment_group[location_address] (form, optional): Location address.
        - appointment_group[publish] (form, optional): Indicates whether this appointment group should be published (
          i.e. made
          available for signup). Once published, an appointment group cannot be
          unpublished. Defaults to false.
        - appointment_group[participants_per_appointment] (form, optional): Maximum number of participants that may
          register for each time slot.
          Defaults to null (no limit).
        - appointment_group[min_appointments_per_participant] (form, optional): Minimum number of time slots a user must
          register for. If not set, users
          do not need to sign up for any time slots.
        - appointment_group[max_appointments_per_participant] (form, optional): Maximum number of time slots a user may
          register for.
        - appointment_group[new_appointments][X] (form, optional): Nested array of start time/end time pairs indicating
          time slots for this
          appointment group. Refer to the example request.
        - appointment_group[participant_visibility] (form, optional): "private":: participants cannot see who has signed
          up for a particular
          time slot
          "protected":: participants can see who has signed up. Defaults to
          "private".
        - appointment_group[allow_observer_signup] (form, optional): Whether observer users can sign-up for an
          appointment. Defaults to false.

- **GET** /v1/appointment_groups/{id}
    - Description: Get a single appointment group
    - Parameters:
        - id (path, required): ID
        - include (query, optional): Array of additional information to include. See include[] argument of
          "List appointment groups" action.

"child_events":: reservations of time slots time slots
"appointments":: will always be returned
"all_context_codes":: all context codes associated with this appointment group

- **PUT** /v1/appointment_groups/{id}
    - Description: Update an appointment group
    - Parameters:
        - id (path, required): ID
        - appointment_group[context_codes] (form, required): Array of context codes (courses, e.g. course_1) this group
          should be
          linked to (1 or more). Users in the course(s) with appropriate permissions
          will be able to sign up for this appointment group.
        - appointment_group[sub_context_codes] (form, optional): Array of sub context codes (course sections or a single
          group category)
          this group should be linked to. Used to limit the appointment group to
          particular sections. If a group category is specified, students will sign
          up in groups and the participant_type will be "Group" instead of "User".
        - appointment_group[title] (form, optional): Short title for the appointment group.
        - appointment_group[description] (form, optional): Longer text description of the appointment group.
        - appointment_group[location_name] (form, optional): Location name of the appointment group.
        - appointment_group[location_address] (form, optional): Location address.
        - appointment_group[publish] (form, optional): Indicates whether this appointment group should be published (
          i.e. made
          available for signup). Once published, an appointment group cannot be
          unpublished. Defaults to false.
        - appointment_group[participants_per_appointment] (form, optional): Maximum number of participants that may
          register for each time slot.
          Defaults to null (no limit).
        - appointment_group[min_appointments_per_participant] (form, optional): Minimum number of time slots a user must
          register for. If not set, users
          do not need to sign up for any time slots.
        - appointment_group[max_appointments_per_participant] (form, optional): Maximum number of time slots a user may
          register for.
        - appointment_group[new_appointments][X] (form, optional): Nested array of start time/end time pairs indicating
          time slots for this
          appointment group. Refer to the example request.
        - appointment_group[participant_visibility] (form, optional): "private":: participants cannot see who has signed
          up for a particular
          time slot
          "protected":: participants can see who has signed up. Defaults to "private".
        - appointment_group[allow_observer_signup] (form, optional): Whether observer users can sign-up for an
          appointment.

- **DELETE** /v1/appointment_groups/{id}
    - Description: Delete an appointment group
    - Parameters:
        - id (path, required): ID
        - cancel_reason (query, optional): Reason for deleting/canceling the appointment group.

- **GET** /v1/appointment_groups/{id}/users
    - Description: List user participants
    - Parameters:
        - id (path, required): ID
        - registration_status (query, optional): Limits results to the a given participation status, defaults to "all"

- **GET** /v1/appointment_groups/{id}/groups
    - Description: List student group participants
    - Parameters:
        - id (path, required): ID
        - registration_status (query, optional): Limits results to the a given participation status, defaults to "all"

- **GET** /v1/appointment_groups/next_appointment
    - Description: Get next appointment
    - Parameters:
        - appointment_group_ids (query, optional): List of ids of appointment groups to search.

### Assignment Extensions

Path: `/assignment_extensions.json`

- **POST** /v1/courses/{course_id}/assignments/{assignment_id}/extensions
    - Description: Set extensions for student assignment submissions
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - assignment_extensions[user_id] (form, required): The ID of the user we want to add assignment extensions for.
        - assignment_extensions[extra_attempts] (form, required): Number of times the student is allowed to re-take the
          assignment over the
          limit.

### Assignment Groups

Path: `/assignment_groups.json`

- **GET** /v1/courses/{course_id}/assignment_groups
    - Description: List assignment groups
    - Parameters:
        - course_id (path, required): ID
        - include (query, optional): Associations to include with the group. "discussion_topic", "all_dates", "
          can_edit",
          "assignment_visibility" & "submission" are only valid if "assignments" is also included.
          "score_statistics" requires that the "assignments" and "submission" options are included.
          The "assignment_visibility" option additionally requires that the Differentiated Assignments course feature be
          turned on.
          If "observed_users" is passed along with "assignments" and "submission", submissions for observed users will
          also be included as an array.
        - assignment_ids (query, optional): If "assignments" are included, optionally return only assignments having
          their ID in this array. This argument may also be passed as
          a comma separated string.
        - exclude_assignment_submission_types (query, optional): If "assignments" are included, those with the specified
          submission types
          will be excluded from the assignment groups.
        - override_assignment_dates (query, optional): Apply assignment overrides for each assignment, defaults to true.
        - grading_period_id (query, optional): The id of the grading period in which assignment groups are being
          requested
          (Requires grading periods to exist.)
        - scope_assignments_to_student (query, optional): If true, all assignments returned will apply to the current
          user in the
          specified grading period. If assignments apply to other students in the
          specified grading period, but not the current user, they will not be
          returned. (Requires the grading_period_id argument and grading periods to
          exist. In addition, the current user must be a student.)

- **GET** /v1/courses/{course_id}/assignment_groups/{assignment_group_id}
    - Description: Get an Assignment Group
    - Parameters:
        - course_id (path, required): ID
        - assignment_group_id (path, required): ID
        - include (query, optional): Associations to include with the group. "discussion_topic" and "
          assignment_visibility" and "submission"
          are only valid if "assignments" is also included. "score_statistics" is only valid if "submission" and
          "assignments" are also included. The "assignment_visibility" option additionally requires that the
          Differentiated Assignments
          course feature be turned on.
        - override_assignment_dates (query, optional): Apply assignment overrides for each assignment, defaults to true.
        - grading_period_id (query, optional): The id of the grading period in which assignment groups are being
          requested
          (Requires grading periods to exist on the account)

- **POST** /v1/courses/{course_id}/assignment_groups
    - Description: Create an Assignment Group
    - Parameters:
        - course_id (path, required): ID
        - name (form, optional): The assignment group's name
        - position (form, optional): The position of this assignment group in relation to the other assignment groups
        - group_weight (form, optional): The percent of the total grade that this assignment group represents
        - sis_source_id (form, optional): The sis source id of the Assignment Group
        - integration_data (form, optional): The integration data of the Assignment Group

- **PUT** /v1/courses/{course_id}/assignment_groups/{assignment_group_id}
    - Description: Edit an Assignment Group
    - Parameters:
        - course_id (path, required): ID
        - assignment_group_id (path, required): ID
        - name (form, optional): The assignment group's name
        - position (form, optional): The position of this assignment group in relation to the other assignment groups
        - group_weight (form, optional): The percent of the total grade that this assignment group represents
        - sis_source_id (form, optional): The sis source id of the Assignment Group
        - integration_data (form, optional): The integration data of the Assignment Group
        - rules (form, optional): The grading rules that are applied within this assignment group
          See the Assignment Group object definition for format

- **DELETE** /v1/courses/{course_id}/assignment_groups/{assignment_group_id}
    - Description: Destroy an Assignment Group
    - Parameters:
        - course_id (path, required): ID
        - assignment_group_id (path, required): ID
        - move_assignments_to (query, optional): The ID of an active Assignment Group to which the assignments that are
          currently assigned to the destroyed Assignment Group will be assigned.
          NOTE: If this argument is not provided, any assignments in this Assignment
          Group will be deleted.

### Assignments

Path: `/assignments.json`

- **DELETE** /v1/courses/{course_id}/assignments/{id}
    - Description: Delete an assignment
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments
    - Description: List assignments
    - Parameters:
        - course_id (path, required): ID
        - include (query, optional): Optional information to include with each assignment:
          submission:: The current user's current +Submission+
          assignment_visibility:: An array of ids of students who can see the assignment
          all_dates:: An array of +AssignmentDate+ structures, one for each override, and also a +base+ if the
          assignment has an "Everyone" / "Everyone Else" date
          overrides:: An array of +AssignmentOverride+ structures
          observed_users:: An array of submissions for observed users
          can_edit:: an extra Boolean value will be included with each +Assignment+ (and +AssignmentDate+ if +all_dates+
          is supplied) to indicate whether the caller can edit the assignment or date. Moderated grading and closed
          grading periods may restrict a user's ability to edit an assignment.
          score_statistics:: An object containing min, max, and mean score on this assignment. This will not be included
          for students if there are less than 5 graded assignments or if disabled by the instructor. Only valid if '
          submission' is also included.
          ab_guid:: An array of guid strings for academic benchmarks
        - search_term (query, optional): The partial title of the assignments to match and return.
        - override_assignment_dates (query, optional): Apply assignment overrides for each assignment, defaults to true.
        - needs_grading_count_by_section (query, optional): Split up "needs_grading_count" by sections into the "
          needs_grading_count_by_section" key, defaults to false
        - bucket (query, optional): If included, only return certain assignments depending on due date and submission
          status.
        - assignment_ids (query, optional): if set, return only assignments specified
        - order_by (query, optional): Determines the order of the assignments. Defaults to "position".
        - post_to_sis (query, optional): Return only assignments that have post_to_sis set or not set.
        - new_quizzes (query, optional): Return only New Quizzes assignments

- **GET** /v1/courses/{course_id}/assignment_groups/{assignment_group_id}/assignments
    - Description: List assignments
    - Parameters:
        - course_id (path, required): ID
        - assignment_group_id (path, required): ID
        - include (query, optional): Optional information to include with each assignment:
          submission:: The current user's current +Submission+
          assignment_visibility:: An array of ids of students who can see the assignment
          all_dates:: An array of +AssignmentDate+ structures, one for each override, and also a +base+ if the
          assignment has an "Everyone" / "Everyone Else" date
          overrides:: An array of +AssignmentOverride+ structures
          observed_users:: An array of submissions for observed users
          can_edit:: an extra Boolean value will be included with each +Assignment+ (and +AssignmentDate+ if +all_dates+
          is supplied) to indicate whether the caller can edit the assignment or date. Moderated grading and closed
          grading periods may restrict a user's ability to edit an assignment.
          score_statistics:: An object containing min, max, and mean score on this assignment. This will not be included
          for students if there are less than 5 graded assignments or if disabled by the instructor. Only valid if '
          submission' is also included.
          ab_guid:: An array of guid strings for academic benchmarks
        - search_term (query, optional): The partial title of the assignments to match and return.
        - override_assignment_dates (query, optional): Apply assignment overrides for each assignment, defaults to true.
        - needs_grading_count_by_section (query, optional): Split up "needs_grading_count" by sections into the "
          needs_grading_count_by_section" key, defaults to false
        - bucket (query, optional): If included, only return certain assignments depending on due date and submission
          status.
        - assignment_ids (query, optional): if set, return only assignments specified
        - order_by (query, optional): Determines the order of the assignments. Defaults to "position".
        - post_to_sis (query, optional): Return only assignments that have post_to_sis set or not set.
        - new_quizzes (query, optional): Return only New Quizzes assignments

- **GET** /v1/users/{user_id}/courses/{course_id}/assignments
    - Description: List assignments for user
    - Parameters:
        - user_id (path, required): ID
        - course_id (path, required): ID

- **POST** /v1/courses/{course_id}/assignments/{assignment_id}/duplicate
    - Description: Duplicate assignment
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - result_type (form, optional): Optional information:
          When the root account has the feature `newquizzes_on_quiz_page` enabled
          and this argument is set to "Quiz" the response will be serialized into a
          quiz format({file:doc/api/quizzes.html#Quiz});
          When this argument isn't specified the response will be serialized into an
          assignment format;

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/users/{user_id}/group_members
    - Description: List group members for a student on an assignment
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/{id}
    - Description: Get a single assignment
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): Associations to include with the assignment. The "assignment_visibility" option
          requires that the Differentiated Assignments course feature be turned on. If
          "observed_users" is passed, submissions for observed users will also be included.
          For "score_statistics" to be included, the "submission" option must also be set.
        - override_assignment_dates (query, optional): Apply assignment overrides to the assignment, defaults to true.
        - needs_grading_count_by_section (query, optional): Split up "needs_grading_count" by sections into the "
          needs_grading_count_by_section" key, defaults to false
        - all_dates (query, optional): All dates associated with the assignment, if applicable

- **POST** /v1/courses/{course_id}/assignments
    - Description: Create an assignment
    - Parameters:
        - course_id (path, required): ID
        - assignment[name] (form, required): The assignment name.
        - assignment[position] (form, optional): The position of this assignment in the group when displaying
          assignment lists.
        - assignment[submission_types] (form, optional): List of supported submission types for the assignment.
          Unless the assignment is allowing online submissions, the array should
          only have one element.

If not allowing online submissions, your options are:
"online_quiz"
"none"
"on_paper"
"discussion_topic"
"external_tool"

If you are allowing online submissions, you can have one or many
allowed submission types:

"online_upload"
"online_text_entry"
"online_url"
"media_recording" (Only valid when the Kaltura plugin is enabled)
"student_annotation"
- assignment[allowed_extensions] (form, optional): Allowed extensions if submission_types includes "online_upload"

Example:
allowed_extensions: ["docx","ppt"]
- assignment[turnitin_enabled] (form, optional): Only applies when the Turnitin plugin is enabled for a course and
the submission_types array includes "online_upload".
Toggles Turnitin submissions for the assignment.
Will be ignored if Turnitin is not available for the course.
- assignment[vericite_enabled] (form, optional): Only applies when the VeriCite plugin is enabled for a course and
the submission_types array includes "online_upload".
Toggles VeriCite submissions for the assignment.
Will be ignored if VeriCite is not available for the course.
- assignment[turnitin_settings] (form, optional): Settings to send along to turnitin. See Assignment object definition
for
format.
- assignment[integration_data] (form, optional): Data used for SIS integrations. Requires admin-level token with the "
Manage SIS" permission. JSON string required.
- assignment[integration_id] (form, optional): Unique ID from third party integrations
- assignment[peer_reviews] (form, optional): If submission_types does not include external_tool,discussion_topic,
online_quiz, or on_paper, determines whether or not peer reviews
will be turned on for the assignment.
- assignment[automatic_peer_reviews] (form, optional): Whether peer reviews will be assigned automatically by Canvas or
if
teachers must manually assign peer reviews. Does not apply if peer reviews
are not enabled.
- assignment[notify_of_update] (form, optional): If true, Canvas will send a notification to students in the class
notifying them that the content has changed.
- assignment[group_category_id] (form, optional): If present, the assignment will become a group assignment assigned
to the group.
- assignment[grade_group_students_individually] (form, optional): If this is a group assignment, teachers have the
options to grade
students individually. If false, Canvas will apply the assignment's
score to each member of the group. If true, the teacher can manually
assign scores to each member of the group.
- assignment[external_tool_tag_attributes] (form, optional): Hash of external tool parameters if submission_types
is ["external_tool"].
See Assignment object definition for format.
- assignment[points_possible] (form, optional): The maximum points possible on the assignment.
- assignment[grading_type] (form, optional): The strategy used for grading the assignment.
The assignment defaults to "points" if this field is omitted.
- assignment[due_at] (form, optional): The day/time the assignment is due. Must be between the lock dates if there are
lock dates.
Accepts times in ISO 8601 format, e.g. 2014-10-21T18:48:00Z.
- assignment[lock_at] (form, optional): The day/time the assignment is locked after. Must be after the due date if there
is a due date.
Accepts times in ISO 8601 format, e.g. 2014-10-21T18:48:00Z.
- assignment[unlock_at] (form, optional): The day/time the assignment is unlocked. Must be before the due date if there
is a due date.
Accepts times in ISO 8601 format, e.g. 2014-10-21T18:48:00Z.
- assignment[description] (form, optional): The assignment's description, supports HTML.
- assignment[assignment_group_id] (form, optional): The assignment group id to put the assignment in.
Defaults to the top assignment group in the course.
- assignment[assignment_overrides] (form, optional): List of overrides for the assignment.
- assignment[only_visible_to_overrides] (form, optional): Whether this assignment is only visible to overrides
(Only useful if 'differentiated assignments' account setting is on)
- assignment[published] (form, optional): Whether this assignment is published.
(Only useful if 'draft state' account setting is on)
Unpublished assignments are not visible to students.
- assignment[grading_standard_id] (form, optional): The grading standard id to set for the course. If no value is
provided for this argument the current grading_standard will be un-set from this course.
This will update the grading_type for the course to 'letter_grade' unless it is already 'gpa_scale'.
- assignment[omit_from_final_grade] (form, optional): Whether this assignment is counted towards a student's final
grade.
- assignment[hide_in_gradebook] (form, optional): Whether this assignment is shown in the gradebook.
- assignment[quiz_lti] (form, optional): Whether this assignment should use the Quizzes 2 LTI tool. Sets the
submission type to 'external_tool' and configures the external tool
attributes to use the Quizzes 2 LTI tool configured for this course.
Has no effect if no Quizzes 2 LTI tool is configured.
- assignment[moderated_grading] (form, optional): Whether this assignment is moderated.
- assignment[grader_count] (form, optional): The maximum number of provisional graders who may issue grades for this
assignment. Only relevant for moderated assignments. Must be a positive
value, and must be set to 1 if the course has fewer than two active
instructors. Otherwise, the maximum value is the number of active
instructors in the course minus one, or 10 if the course has more than 11
active instructors.
- assignment[final_grader_id] (form, optional): The user ID of the grader responsible for choosing final grades for this
assignment. Only relevant for moderated assignments.
- assignment[grader_comments_visible_to_graders] (form, optional): Boolean indicating if provisional graders' comments
are visible to other
provisional graders. Only relevant for moderated assignments.
- assignment[graders_anonymous_to_graders] (form, optional): Boolean indicating if provisional graders' identities are
hidden from
other provisional graders. Only relevant for moderated assignments.
- assignment[graders_names_visible_to_final_grader] (form, optional): Boolean indicating if provisional grader
identities are visible to the
the final grader. Only relevant for moderated assignments.
- assignment[anonymous_grading] (form, optional): Boolean indicating if the assignment is graded anonymously. If true,
graders cannot see student identities.
- assignment[allowed_attempts] (form, optional): The number of submission attempts allowed for this assignment. Set to
-1 for unlimited attempts.
- assignment[annotatable_attachment_id] (form, optional): The Attachment ID of the document being annotated.

Only applies when submission_types includes "student_annotation".

- **PUT** /v1/courses/{course_id}/assignments/{id}
    - Description: Edit an assignment
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - assignment[name] (form, optional): The assignment name.
        - assignment[position] (form, optional): The position of this assignment in the group when displaying
          assignment lists.
        - assignment[submission_types] (form, optional): Only applies if the assignment doesn't have student
          submissions.

List of supported submission types for the assignment.
Unless the assignment is allowing online submissions, the array should
only have one element.

If not allowing online submissions, your options are:
"online_quiz"
"none"
"on_paper"
"discussion_topic"
"external_tool"

If you are allowing online submissions, you can have one or many
allowed submission types:

"online_upload"
"online_text_entry"
"online_url"
"media_recording" (Only valid when the Kaltura plugin is enabled)
"student_annotation"
- assignment[allowed_extensions] (form, optional): Allowed extensions if submission_types includes "online_upload"

Example:
allowed_extensions: ["docx","ppt"]
- assignment[turnitin_enabled] (form, optional): Only applies when the Turnitin plugin is enabled for a course and
the submission_types array includes "online_upload".
Toggles Turnitin submissions for the assignment.
Will be ignored if Turnitin is not available for the course.
- assignment[vericite_enabled] (form, optional): Only applies when the VeriCite plugin is enabled for a course and
the submission_types array includes "online_upload".
Toggles VeriCite submissions for the assignment.
Will be ignored if VeriCite is not available for the course.
- assignment[turnitin_settings] (form, optional): Settings to send along to turnitin. See Assignment object definition
for
format.
- assignment[sis_assignment_id] (form, optional): The sis id of the Assignment
- assignment[integration_data] (form, optional): Data used for SIS integrations. Requires admin-level token with the "
Manage SIS" permission. JSON string required.
- assignment[integration_id] (form, optional): Unique ID from third party integrations
- assignment[peer_reviews] (form, optional): If submission_types does not include external_tool,discussion_topic,
online_quiz, or on_paper, determines whether or not peer reviews
will be turned on for the assignment.
- assignment[automatic_peer_reviews] (form, optional): Whether peer reviews will be assigned automatically by Canvas or
if
teachers must manually assign peer reviews. Does not apply if peer reviews
are not enabled.
- assignment[notify_of_update] (form, optional): If true, Canvas will send a notification to students in the class
notifying them that the content has changed.
- assignment[group_category_id] (form, optional): If present, the assignment will become a group assignment assigned
to the group.
- assignment[grade_group_students_individually] (form, optional): If this is a group assignment, teachers have the
options to grade
students individually. If false, Canvas will apply the assignment's
score to each member of the group. If true, the teacher can manually
assign scores to each member of the group.
- assignment[external_tool_tag_attributes] (form, optional): Hash of external tool parameters if submission_types
is ["external_tool"].
See Assignment object definition for format.
- assignment[points_possible] (form, optional): The maximum points possible on the assignment.
- assignment[grading_type] (form, optional): The strategy used for grading the assignment.
The assignment defaults to "points" if this field is omitted.
- assignment[due_at] (form, optional): The day/time the assignment is due.
Accepts times in ISO 8601 format, e.g. 2014-10-21T18:48:00Z.
- assignment[lock_at] (form, optional): The day/time the assignment is locked after. Must be after the due date if there
is a due date.
Accepts times in ISO 8601 format, e.g. 2014-10-21T18:48:00Z.
- assignment[unlock_at] (form, optional): The day/time the assignment is unlocked. Must be before the due date if there
is a due date.
Accepts times in ISO 8601 format, e.g. 2014-10-21T18:48:00Z.
- assignment[description] (form, optional): The assignment's description, supports HTML.
- assignment[assignment_group_id] (form, optional): The assignment group id to put the assignment in.
Defaults to the top assignment group in the course.
- assignment[assignment_overrides] (form, optional): List of overrides for the assignment.
If the +assignment[assignment_overrides]+ key is absent, any existing
overrides are kept as is. If the +assignment[assignment_overrides]+ key is
present, existing overrides are updated or deleted (and new ones created,
as necessary) to match the provided list.
- assignment[only_visible_to_overrides] (form, optional): Whether this assignment is only visible to overrides
(Only useful if 'differentiated assignments' account setting is on)
- assignment[published] (form, optional): Whether this assignment is published.
(Only useful if 'draft state' account setting is on)
Unpublished assignments are not visible to students.
- assignment[grading_standard_id] (form, optional): The grading standard id to set for the course. If no value is
provided for this argument the current grading_standard will be un-set from this course.
This will update the grading_type for the course to 'letter_grade' unless it is already 'gpa_scale'.
- assignment[omit_from_final_grade] (form, optional): Whether this assignment is counted towards a student's final
grade.
- assignment[hide_in_gradebook] (form, optional): Whether this assignment is shown in the gradebook.
- assignment[moderated_grading] (form, optional): Whether this assignment is moderated.
- assignment[grader_count] (form, optional): The maximum number of provisional graders who may issue grades for this
assignment. Only relevant for moderated assignments. Must be a positive
value, and must be set to 1 if the course has fewer than two active
instructors. Otherwise, the maximum value is the number of active
instructors in the course minus one, or 10 if the course has more than 11
active instructors.
- assignment[final_grader_id] (form, optional): The user ID of the grader responsible for choosing final grades for this
assignment. Only relevant for moderated assignments.
- assignment[grader_comments_visible_to_graders] (form, optional): Boolean indicating if provisional graders' comments
are visible to other
provisional graders. Only relevant for moderated assignments.
- assignment[graders_anonymous_to_graders] (form, optional): Boolean indicating if provisional graders' identities are
hidden from
other provisional graders. Only relevant for moderated assignments.
- assignment[graders_names_visible_to_final_grader] (form, optional): Boolean indicating if provisional grader
identities are visible to the
the final grader. Only relevant for moderated assignments.
- assignment[anonymous_grading] (form, optional): Boolean indicating if the assignment is graded anonymously. If true,
graders cannot see student identities.
- assignment[allowed_attempts] (form, optional): The number of submission attempts allowed for this assignment. Set to
-1 or null for
unlimited attempts.
- assignment[annotatable_attachment_id] (form, optional): The Attachment ID of the document being annotated.

Only applies when submission_types includes "student_annotation".
- assignment[force_updated_at] (form, optional): If true, updated_at will be set even if no changes were made.
- assignment[submission_types] (form, optional): Only applies if the assignment doesn't have student submissions.

- **PUT** /v1/courses/{course_id}/assignments/bulk_update
    - Description: Bulk update assignment dates
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/overrides
    - Description: List assignment overrides
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/overrides/{id}
    - Description: Get a single assignment override
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/groups/{group_id}/assignments/{assignment_id}/override
    - Description: Redirect to the assignment override for a group
    - Parameters:
        - group_id (path, required): ID
        - assignment_id (path, required): ID

- **GET** /v1/sections/{course_section_id}/assignments/{assignment_id}/override
    - Description: Redirect to the assignment override for a section
    - Parameters:
        - course_section_id (path, required): ID
        - assignment_id (path, required): ID

- **POST** /v1/courses/{course_id}/assignments/{assignment_id}/overrides
    - Description: Create an assignment override
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - assignment_override[student_ids] (form, optional): The IDs of
          the override's target students. If present, the IDs must each identify a
          user with an active student enrollment in the course that is not already
          targetted by a different adhoc override.
        - assignment_override[title] (form, optional): The title of the adhoc
          assignment override. Required if student_ids is present, ignored
          otherwise (the title is set to the name of the targetted group or section
          instead).
        - assignment_override[group_id] (form, optional): The ID of the
          override's target group. If present, the following conditions must be met
          for the override to be successful:

1. the assignment MUST be a group assignment (a group_category_id is assigned to it)
2. the ID must identify an active group in the group set the assignment is in
3. the ID must not be targetted by a different override

See {Appendix: Group assignments} for more info.
- assignment_override[course_section_id] (form, optional): The ID
of the override's target section. If present, must identify an active
section of the assignment's course not already targetted by a different
override.
- assignment_override[due_at] (form, optional): The day/time
the overridden assignment is due. Accepts times in ISO 8601 format, e.g.
2014-10-21T18:48:00Z. If absent, this override will not affect due date.
May be present but null to indicate the override removes any previous due
date.
- assignment_override[unlock_at] (form, optional): The day/time
the overridden assignment becomes unlocked. Accepts times in ISO 8601
format, e.g. 2014-10-21T18:48:00Z. If absent, this override will not
affect the unlock date. May be present but null to indicate the override
removes any previous unlock date.
- assignment_override[lock_at] (form, optional): The day/time
the overridden assignment becomes locked. Accepts times in ISO 8601
format, e.g. 2014-10-21T18:48:00Z. If absent, this override will not
affect the lock date. May be present but null to indicate the override
removes any previous lock date.

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/overrides/{id}
    - Description: Update an assignment override
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - id (path, required): ID
        - assignment_override[student_ids] (form, optional): The IDs of the
          override's target students. If present, the IDs must each identify a
          user with an active student enrollment in the course that is not already
          targetted by a different adhoc override. Ignored unless the override
          being updated is adhoc.
        - assignment_override[title] (form, optional): The title of an adhoc
          assignment override. Ignored unless the override being updated is adhoc.
        - assignment_override[due_at] (form, optional): The day/time
          the overridden assignment is due. Accepts times in ISO 8601 format, e.g.
          2014-10-21T18:48:00Z. If absent, this override will not affect due date.
          May be present but null to indicate the override removes any previous due
          date.
        - assignment_override[unlock_at] (form, optional): The day/time
          the overridden assignment becomes unlocked. Accepts times in ISO 8601
          format, e.g. 2014-10-21T18:48:00Z. If absent, this override will not
          affect the unlock date. May be present but null to indicate the override
          removes any previous unlock date.
        - assignment_override[lock_at] (form, optional): The day/time
          the overridden assignment becomes locked. Accepts times in ISO 8601
          format, e.g. 2014-10-21T18:48:00Z. If absent, this override will not
          affect the lock date. May be present but null to indicate the override
          removes any previous lock date.

- **DELETE** /v1/courses/{course_id}/assignments/{assignment_id}/overrides/{id}
    - Description: Delete an assignment override
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/overrides
    - Description: Batch retrieve overrides in a course
    - Parameters:
        - course_id (path, required): ID
        - assignment_overrides[id] (query, required): Ids of overrides to retrieve
        - assignment_overrides[assignment_id] (query, required): Ids of assignments for each override

- **POST** /v1/courses/{course_id}/assignments/overrides
    - Description: Batch create overrides in a course
    - Parameters:
        - course_id (path, required): ID
        - assignment_overrides (form, required): Attributes for the new assignment overrides.
          See {api:AssignmentOverridesController#create Create an assignment override} for available
          attributes

- **PUT** /v1/courses/{course_id}/assignments/overrides
    - Description: Batch update overrides in a course
    - Parameters:
        - course_id (path, required): ID
        - assignment_overrides (form, required): Attributes for the updated overrides.

### Authentication Providers

Path: `/authentication_providers.json`

- **GET** /v1/accounts/{account_id}/authentication_providers
    - Description: List authentication providers
    - Parameters:
        - account_id (path, required): ID

- **POST** /v1/accounts/{account_id}/authentication_providers
    - Description: Add authentication provider
    - Parameters:
        - account_id (path, required): ID

- **PUT** /v1/accounts/{account_id}/authentication_providers/{id}
    - Description: Update authentication provider
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/authentication_providers/{id}
    - Description: Get authentication provider
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/accounts/{account_id}/authentication_providers/{id}
    - Description: Delete authentication provider
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/sso_settings
    - Description: show account auth settings
    - Parameters:
        - account_id (path, required): ID

- **PUT** /v1/accounts/{account_id}/sso_settings
    - Description: update account auth settings
    - Parameters:
        - account_id (path, required): ID

### Authentications Log

Path: `/authentications_log.json`

- **GET** /v1/audit/authentication/logins/{login_id}
    - Description: Query by login.
    - Parameters:
        - login_id (path, required): ID
        - start_time (query, optional): The beginning of the time range from which you want events.
          Events are stored for one year.
        - end_time (query, optional): The end of the time range from which you want events.

- **GET** /v1/audit/authentication/accounts/{account_id}
    - Description: Query by account.
    - Parameters:
        - account_id (path, required): ID
        - start_time (query, optional): The beginning of the time range from which you want events.
          Events are stored for one year.
        - end_time (query, optional): The end of the time range from which you want events.

- **GET** /v1/audit/authentication/users/{user_id}
    - Description: Query by user.
    - Parameters:
        - user_id (path, required): ID
        - start_time (query, optional): The beginning of the time range from which you want events.
          Events are stored for one year.
        - end_time (query, optional): The end of the time range from which you want events.

### Blackout Dates

Path: `/blackout_dates.json`

- **GET** /v1/courses/{course_id}/blackout_dates
    - Description: List blackout dates
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/accounts/{account_id}/blackout_dates
    - Description: List blackout dates
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/blackout_dates/{id}
    - Description: Get a single blackout date
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/blackout_dates/{id}
    - Description: Get a single blackout date
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/blackout_dates/new
    - Description: New Blackout Date
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/accounts/{account_id}/blackout_dates/new
    - Description: New Blackout Date
    - Parameters:
        - account_id (path, required): ID

- **POST** /v1/courses/{course_id}/blackout_dates
    - Description: Create Blackout Date
    - Parameters:
        - course_id (path, required): ID
        - start_date (form, optional): The start date of the blackout date.
        - end_date (form, optional): The end date of the blackout date.
        - event_title (form, optional): The title of the blackout date.

- **POST** /v1/accounts/{account_id}/blackout_dates
    - Description: Create Blackout Date
    - Parameters:
        - account_id (path, required): ID
        - start_date (form, optional): The start date of the blackout date.
        - end_date (form, optional): The end date of the blackout date.
        - event_title (form, optional): The title of the blackout date.

- **PUT** /v1/courses/{course_id}/blackout_dates/{id}
    - Description: Update Blackout Date
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - start_date (form, optional): The start date of the blackout date.
        - end_date (form, optional): The end date of the blackout date.
        - event_title (form, optional): The title of the blackout date.

- **PUT** /v1/accounts/{account_id}/blackout_dates/{id}
    - Description: Update Blackout Date
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - start_date (form, optional): The start date of the blackout date.
        - end_date (form, optional): The end date of the blackout date.
        - event_title (form, optional): The title of the blackout date.

- **DELETE** /v1/courses/{course_id}/blackout_dates/{id}
    - Description: Delete Blackout Date
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/accounts/{account_id}/blackout_dates/{id}
    - Description: Delete Blackout Date
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/courses/{course_id}/blackout_dates
    - Description: Update a list of Blackout Dates
    - Parameters:
        - course_id (path, required): ID
        - blackout_dates: (form, optional): [blackout_date, ...]
          An object containing the array of BlackoutDates we want to exist after this operation.
          For array entries, if it has an id it will be updated, if not created, and if
          an existing BlackoutDate id is missing from the array, it will be deleted.

### BlockEditorTemplate

Path: `/block_editor_template.json`

- **GET** /v1/courses/{course_id}/block_editor_templates
    - Description: List block templates
    - Parameters:
        - course_id (path, required): ID
        - sort (query, optional): Sort results by this field.
        - order (query, optional): The sorting order. Defaults to 'asc'.
        - drafts (query, optional): If true, include draft templates. If false or omitted
          only published templates will be returned.
        - type (query, optional): What type of templates should be returned.
        - include (query, optional): no description

### Blueprint Courses

Path: `/blueprint_courses.json`

- **GET** /v1/courses/{course_id}/blueprint_templates/{template_id}
    - Description: Get blueprint information
    - Parameters:
        - course_id (path, required): ID
        - template_id (path, required): ID

- **GET** /v1/courses/{course_id}/blueprint_templates/{template_id}/associated_courses
    - Description: Get associated course information
    - Parameters:
        - course_id (path, required): ID
        - template_id (path, required): ID

- **PUT** /v1/courses/{course_id}/blueprint_templates/{template_id}/update_associations
    - Description: Update associated courses
    - Parameters:
        - course_id (path, required): ID
        - template_id (path, required): ID
        - course_ids_to_add (form, optional): Courses to add as associated courses
        - course_ids_to_remove (form, optional): Courses to remove as associated courses

- **POST** /v1/courses/{course_id}/blueprint_templates/{template_id}/migrations
    - Description: Begin a migration to push to associated courses
    - Parameters:
        - course_id (path, required): ID
        - template_id (path, required): ID
        - comment (form, optional): An optional comment to be included in the sync history.
        - send_notification (form, optional): Send a notification to the calling user when the sync completes.
        - copy_settings (form, optional): Whether course settings should be copied over to associated courses.
          Defaults to true for newly associated courses.
        - send_item_notifications (form, optional): By default, new-item notifications are suppressed in blueprint
          syncs.
          If this option is set, teachers and students may receive notifications
          for items such as announcements and assignments that are created
          in associated courses (subject to the usual notification settings).
          This option requires the Blueprint Item Notifications feature to be enabled.
        - publish_after_initial_sync (form, optional): If set, newly associated courses will be automatically published
          after the sync completes

- **PUT** /v1/courses/{course_id}/blueprint_templates/{template_id}/restrict_item
    - Description: Set or remove restrictions on a blueprint course object
    - Parameters:
        - course_id (path, required): ID
        - template_id (path, required): ID
        - content_type (form,
          optional): [String, "assignment"|"attachment"|"discussion_topic"|"external_tool"|"lti-quiz"|"quiz"|"wiki_page"]
          The type of the object.
        - content_id (form, optional): The ID of the object.
        - restricted (form, optional): Whether to apply restrictions.
        - restrictions (form, optional): (Optional) If the object is restricted, this specifies a set of restrictions.
          If not specified,
          the course-level restrictions will be used. See {api:CoursesController#update Course API update documentation}

- **GET** /v1/courses/{course_id}/blueprint_templates/{template_id}/unsynced_changes
    - Description: Get unsynced changes
    - Parameters:
        - course_id (path, required): ID
        - template_id (path, required): ID

- **GET** /v1/courses/{course_id}/blueprint_templates/{template_id}/migrations
    - Description: List blueprint migrations
    - Parameters:
        - course_id (path, required): ID
        - template_id (path, required): ID

- **GET** /v1/courses/{course_id}/blueprint_templates/{template_id}/migrations/{id}
    - Description: Show a blueprint migration
    - Parameters:
        - course_id (path, required): ID
        - template_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/blueprint_templates/{template_id}/migrations/{id}/details
    - Description: Get migration details
    - Parameters:
        - course_id (path, required): ID
        - template_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/blueprint_subscriptions
    - Description: List blueprint subscriptions
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/blueprint_subscriptions/{subscription_id}/migrations
    - Description: List blueprint imports
    - Parameters:
        - course_id (path, required): ID
        - subscription_id (path, required): ID

- **GET** /v1/courses/{course_id}/blueprint_subscriptions/{subscription_id}/migrations/{id}
    - Description: Show a blueprint import
    - Parameters:
        - course_id (path, required): ID
        - subscription_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/blueprint_subscriptions/{subscription_id}/migrations/{id}/details
    - Description: Get import details
    - Parameters:
        - course_id (path, required): ID
        - subscription_id (path, required): ID
        - id (path, required): ID

### Bookmarks

Path: `/bookmarks.json`

- **GET** /v1/users/self/bookmarks
    - Description: List bookmarks

- **POST** /v1/users/self/bookmarks
    - Description: Create bookmark
    - Parameters:
        - name (form, optional): The name of the bookmark
        - url (form, optional): The url of the bookmark
        - position (form, optional): The position of the bookmark. Defaults to the bottom.
        - data (form, optional): The data associated with the bookmark

- **GET** /v1/users/self/bookmarks/{id}
    - Description: Get bookmark
    - Parameters:
        - id (path, required): ID

- **PUT** /v1/users/self/bookmarks/{id}
    - Description: Update bookmark
    - Parameters:
        - id (path, required): ID
        - name (form, optional): The name of the bookmark
        - url (form, optional): The url of the bookmark
        - position (form, optional): The position of the bookmark. Defaults to the bottom.
        - data (form, optional): The data associated with the bookmark

- **DELETE** /v1/users/self/bookmarks/{id}
    - Description: Delete bookmark
    - Parameters:
        - id (path, required): ID

### Brand Configs

Path: `/brand_configs.json`

- **GET** /v1/brand_variables
    - Description: Get the brand config variables that should be used for this domain

### Calendar Events

Path: `/calendar_events.json`

- **GET** /v1/calendar_events
    - Description: List calendar events
    - Parameters:
        - type (query, optional): Defaults to "event"
        - start_date (query, optional): Only return events since the start_date (inclusive).
          Defaults to today. The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - end_date (query, optional): Only return events before the end_date (inclusive).
          Defaults to start_date. The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
          If end_date is the same as start_date, then only events on that day are
          returned.
        - undated (query, optional): Defaults to false (dated events only).
          If true, only return undated events and ignore start_date and end_date.
        - all_events (query, optional): Defaults to false (uses start_date, end_date, and undated criteria).
          If true, all events are returned, ignoring start_date, end_date, and undated criteria.
        - context_codes (query, optional): List of context codes of courses, groups, users, or accounts whose events you
          want to see.
          If not specified, defaults to the current user (i.e personal calendar,
          no course/group events). Limited to 10 context codes, additional ones are
          ignored. The format of this field is the context type, followed by an
          underscore, followed by the context id. For example: course_42
        - excludes (query, optional): Array of attributes to exclude. Possible values are "description", "child_events"
          and "assignment"
        - includes (query, optional): Array of optional attributes to include. Possible values are "web_conference"
          and "series_natural_language"
        - important_dates (query, optional): Defaults to false.
          If true, only events with important dates set to true will be returned.
        - blackout_date (query, optional): Defaults to false.
          If true, only events with blackout date set to true will be returned.

- **GET** /v1/users/{user_id}/calendar_events
    - Description: List calendar events for a user
    - Parameters:
        - user_id (path, required): ID
        - type (query, optional): Defaults to "event"
        - start_date (query, optional): Only return events since the start_date (inclusive).
          Defaults to today. The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - end_date (query, optional): Only return events before the end_date (inclusive).
          Defaults to start_date. The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
          If end_date is the same as start_date, then only events on that day are
          returned.
        - undated (query, optional): Defaults to false (dated events only).
          If true, only return undated events and ignore start_date and end_date.
        - all_events (query, optional): Defaults to false (uses start_date, end_date, and undated criteria).
          If true, all events are returned, ignoring start_date, end_date, and undated criteria.
        - context_codes (query, optional): List of context codes of courses, groups, users, or accounts whose events you
          want to see.
          If not specified, defaults to the current user (i.e personal calendar,
          no course/group events). Limited to 10 context codes, additional ones are
          ignored. The format of this field is the context type, followed by an
          underscore, followed by the context id. For example: course_42
        - excludes (query, optional): Array of attributes to exclude. Possible values are "description", "child_events"
          and "assignment"
        - submission_types (query, optional): When type is "assignment", specifies the allowable submission types for
          returned assignments.
          Ignored if type is not "assignment" or if exclude_submission_types is provided.
        - exclude_submission_types (query, optional): When type is "assignment", specifies the submission types to be
          excluded from the returned
          assignments. Ignored if type is not "assignment".
        - includes (query, optional): Array of optional attributes to include. Possible values are "web_conference"
          and "series_natural_language"
        - important_dates (query, optional): Defaults to false
          If true, only events with important dates set to true will be returned.
        - blackout_date (query, optional): Defaults to false
          If true, only events with blackout date set to true will be returned.

- **POST** /v1/calendar_events
    - Description: Create a calendar event
    - Parameters:
        - calendar_event[context_code] (form, required): Context code of the course, group, user, or account whose
          calendar
          this event should be added to.
        - calendar_event[title] (form, optional): Short title for the calendar event.
        - calendar_event[description] (form, optional): Longer HTML description of the event.
        - calendar_event[start_at] (form, optional): Start date/time of the event.
        - calendar_event[end_at] (form, optional): End date/time of the event.
        - calendar_event[location_name] (form, optional): Location name of the event.
        - calendar_event[location_address] (form, optional): Location address
        - calendar_event[time_zone_edited] (form, optional): Time zone of the user editing the event. Allowed time zones
          are
          {http://www.iana.org/time-zones IANA time zones} or friendlier
          {http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html Ruby on Rails time zones}.
        - calendar_event[all_day] (form, optional): When true event is considered to span the whole day and times are
          ignored.
        - calendar_event[child_event_data][X][start_at] (form, optional): Section-level start time(s) if this is a
          course event. X can be any
          identifier, provided that it is consistent across the start_at, end_at
          and context_code
        - calendar_event[child_event_data][X][end_at] (form, optional): Section-level end time(s) if this is a course
          event.
        - calendar_event[child_event_data][X][context_code] (form, optional): Context code(s) corresponding to the
          section-level start and end time(s).
        - calendar_event[duplicate][count] (form, optional): Number of times to copy/duplicate the event. Count cannot
          exceed 200.
        - calendar_event[duplicate][interval] (form, optional): Defaults to 1 if duplicate `count` is set. The interval
          between the duplicated events.
        - calendar_event[duplicate][frequency] (form, optional): Defaults to "weekly". The frequency at which to
          duplicate the event
        - calendar_event[duplicate][append_iterator] (form, optional): Defaults to false. If set to `true`, an
          increasing counter number will be appended to the event title
          when the event is duplicated.  (e.g. Event 1, Event 2, Event 3, etc)
        - calendar_event[rrule] (form, optional): The recurrence rule to create a series of recurring events.
          Its value is the {https://icalendar.org/iCalendar-RFC-5545/3-8-5-3-recurrence-rule.html iCalendar RRULE}
          defining how the event repeats. Unending series not supported.
        - calendar_event[blackout_date] (form, optional): If the blackout_date is true, this event represents a holiday
          or some
          other special day that does not count in course pacing.

- **GET** /v1/calendar_events/{id}
    - Description: Get a single calendar event or assignment
    - Parameters:
        - id (path, required): ID

- **POST** /v1/calendar_events/{id}/reservations
    - Description: Reserve a time slot
    - Parameters:
        - id (path, required): ID
        - participant_id (form, optional): User or group id for whom you are making the reservation (depends on the
          participant type). Defaults to the current user (or user's candidate group).
        - comments (form, optional): Comments to associate with this reservation
        - cancel_existing (form, optional): Defaults to false. If true, cancel any previous reservation(s) for this
          participant and appointment group.

- **POST** /v1/calendar_events/{id}/reservations/{participant_id}
    - Description: Reserve a time slot
    - Parameters:
        - id (path, required): ID
        - participant_id (path, required): User or group id for whom you are making the reservation (depends on the
          participant type). Defaults to the current user (or user's candidate group).
        - comments (form, optional): Comments to associate with this reservation
        - cancel_existing (form, optional): Defaults to false. If true, cancel any previous reservation(s) for this
          participant and appointment group.

- **PUT** /v1/calendar_events/{id}
    - Description: Update a calendar event
    - Parameters:
        - id (path, required): ID
        - calendar_event[context_code] (form, optional): Context code of the course, group, user, or account to move
          this event to.
          Scheduler appointments and events with section-specific times cannot be moved between calendars.
        - calendar_event[title] (form, optional): Short title for the calendar event.
        - calendar_event[description] (form, optional): Longer HTML description of the event.
        - calendar_event[start_at] (form, optional): Start date/time of the event.
        - calendar_event[end_at] (form, optional): End date/time of the event.
        - calendar_event[location_name] (form, optional): Location name of the event.
        - calendar_event[location_address] (form, optional): Location address
        - calendar_event[time_zone_edited] (form, optional): Time zone of the user editing the event. Allowed time zones
          are
          {http://www.iana.org/time-zones IANA time zones} or friendlier
          {http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html Ruby on Rails time zones}.
        - calendar_event[all_day] (form, optional): When true event is considered to span the whole day and times are
          ignored.
        - calendar_event[child_event_data][X][start_at] (form, optional): Section-level start time(s) if this is a
          course event. X can be any
          identifier, provided that it is consistent across the start_at, end_at
          and context_code
        - calendar_event[child_event_data][X][end_at] (form, optional): Section-level end time(s) if this is a course
          event.
        - calendar_event[child_event_data][X][context_code] (form, optional): Context code(s) corresponding to the
          section-level start and end time(s).
        - calendar_event[rrule] (form, optional): Valid if the event whose ID is in the URL is part of a series.
          This defines the shape of the recurring event series after it's updated.
          Its value is the iCalendar RRULE. Unending series are not supported.
        - which (form, optional): Valid if the event whose ID is in the URL is part of a series.
          Update just the event whose ID is in in the URL, all events
          in the series, or the given event and all those following.
          Some updates may create a new series. For example, changing the start time
          of this and all following events from the middle of a series.
        - calendar_event[blackout_date] (form, optional): If the blackout_date is true, this event represents a holiday
          or some
          other special day that does not count in course pacing.

- **DELETE** /v1/calendar_events/{id}
    - Description: Delete a calendar event
    - Parameters:
        - id (path, required): ID
        - cancel_reason (query, optional): Reason for deleting/canceling the event.
        - which (query, optional): Valid if the event whose ID is in the URL is part of a series.
          Delete just the event whose ID is in in the URL, all events
          in the series, or the given event and all those following.

- **POST** /v1/calendar_events/save_enabled_account_calendars
    - Description: Save enabled account calendars
    - Parameters:
        - mark_feature_as_seen (form, optional): Flag to mark account calendars feature as seen
        - enabled_account_calendars (form, optional): An array of account Ids to remember in the calendars list of the
          user

- **POST** /v1/courses/{course_id}/calendar_events/timetable
    - Description: Set a course timetable
    - Parameters:
        - course_id (path, required): ID
        - timetables[course_section_id] (form, optional): An array of timetable objects for the course section specified
          by course_section_id.
          If course_section_id is set to "all", events will be created for the entire course.
        - timetables[course_section_id][weekdays] (form, optional): A comma-separated list of abbreviated weekdays
          (Mon-Monday, Tue-Tuesday, Wed-Wednesday, Thu-Thursday, Fri-Friday, Sat-Saturday, Sun-Sunday)
        - timetables[course_section_id][start_time] (form, optional): Time to start each event at (e.g. "9:00 am")
        - timetables[course_section_id][end_time] (form, optional): Time to end each event at (e.g. "9:00 am")
        - timetables[course_section_id][location_name] (form, optional): A location name to set for each event

- **GET** /v1/courses/{course_id}/calendar_events/timetable
    - Description: Get course timetable
    - Parameters:
        - course_id (path, required): ID

- **POST** /v1/courses/{course_id}/calendar_events/timetable_events
    - Description: Create or update events directly for a course timetable
    - Parameters:
        - course_id (path, required): ID
        - course_section_id (form, optional): Events will be created for the course section specified by
          course_section_id.
          If not present, events will be created for the entire course.
        - events (form, optional): An array of event objects to use.
        - events[start_at] (form, optional): Start time for the event
        - events[end_at] (form, optional): End time for the event
        - events[location_name] (form, optional): Location name for the event
        - events[code] (form, optional): A unique identifier that can be used to update the event at a later time
          If one is not specified, an identifier will be generated based on the start and end times
        - events[title] (form, optional): Title for the meeting. If not present, will default to the associated course's
          name

### Collaborations

Path: `/collaborations.json`

- **GET** /v1/courses/{course_id}/collaborations
    - Description: List collaborations
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/collaborations
    - Description: List collaborations
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/collaborations/{id}/members
    - Description: List members of a collaboration.
    - Parameters:
        - id (path, required): ID
        - include (query, optional): - "collaborator_lti_id": Optional information to include with each member.
          Represents an identifier to be used for the member in an LTI context.
- "avatar_image_url": Optional information to include with each member.
  The url for the avatar of a collaborator with type 'user'.

- **GET** /v1/courses/{course_id}/potential_collaborators
    - Description: List potential members
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/potential_collaborators
    - Description: List potential members
    - Parameters:
        - group_id (path, required): ID

### CommMessages

Path: `/comm_messages.json`

- **GET** /v1/comm_messages
    - Description: List of CommMessages for a user
    - Parameters:
        - user_id (query, required): The user id for whom you want to retrieve CommMessages
        - start_time (query, optional): The beginning of the time range you want to retrieve message from.
          Up to a year prior to the current date is available.
        - end_time (query, optional): The end of the time range you want to retrieve messages for.
          Up to a year prior to the current date is available.

### Communication Channels

Path: `/communication_channels.json`

- **GET** /v1/users/{user_id}/communication_channels
    - Description: List user communication channels
    - Parameters:
        - user_id (path, required): ID

- **POST** /v1/users/{user_id}/communication_channels
    - Description: Create a communication channel
    - Parameters:
        - user_id (path, required): ID
        - communication_channel[address] (form, required): An email address or SMS number. Not required for "push" type
          channels.
        - communication_channel[type] (form, required): The type of communication channel.

In order to enable push notification support, the server must be
properly configured (via `sns_creds` in Vault) to communicate with Amazon
Simple Notification Services, and the developer key used to create
the access token from this request must have an SNS ARN configured on
it.
- communication_channel[token] (form, optional): A registration id, device token, or equivalent token given to an app
when
registering with a push notification provider. Only valid for "push" type channels.
- skip_confirmation (form, optional): Only valid for site admins and account admins making requests; If true, the
channel is
automatically validated and no confirmation email or SMS is sent.
Otherwise, the user must respond to a confirmation message to confirm the
channel.

- **DELETE** /v1/users/{user_id}/communication_channels/{id}
    - Description: Delete a communication channel
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/users/{user_id}/communication_channels/{type}/{address}
    - Description: Delete a communication channel
    - Parameters:
        - user_id (path, required): ID
        - type (path, required): ID
        - address (path, required): ID

- **DELETE** /v1/users/self/communication_channels/push
    - Description: Delete a push notification endpoint

### Conferences

Path: `/conferences.json`

- **GET** /v1/courses/{course_id}/conferences
    - Description: List conferences
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/conferences
    - Description: List conferences
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/conferences
    - Description: List conferences for the current user
    - Parameters:
        - state (query, optional): If set to "live", returns only conferences that are live (i.e., have
          started and not finished yet). If omitted, returns all conferences for
          this user's groups and courses.

### Content Exports

Path: `/content_exports.json`

- **GET** /v1/courses/{course_id}/content_exports
    - Description: List content exports
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/content_exports
    - Description: List content exports
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/users/{user_id}/content_exports
    - Description: List content exports
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/courses/{course_id}/content_exports/{id}
    - Description: Show content export
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/groups/{group_id}/content_exports/{id}
    - Description: Show content export
    - Parameters:
        - group_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/users/{user_id}/content_exports/{id}
    - Description: Show content export
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/content_exports
    - Description: Export content
    - Parameters:
        - course_id (path, required): ID
        - export_type (form, required): "common_cartridge":: Export the contents of the course in the Common Cartridge (
          .imscc) format
          "qti":: Export quizzes from a course in the QTI format
          "zip":: Export files from a course, group, or user in a zip file
        - skip_notifications (form, optional): Don't send the notifications about the export to the user. Default: false
        - select (form, optional): The select parameter allows exporting specific data. The keys are object types like '
          files',
          'folders', 'pages', etc. The value for each key is a list of object ids. An id can be an
          integer or a string.

Multiple object types can be selected in the same call. However, not all object types are
valid for every export_type. Common Cartridge supports all object types. Zip and QTI only
support the object types as described below.

"folders":: Also supported for zip export_type.
"files":: Also supported for zip export_type.
"quizzes":: Also supported for qti export_type.

- **POST** /v1/groups/{group_id}/content_exports
    - Description: Export content
    - Parameters:
        - group_id (path, required): ID
        - export_type (form, required): "common_cartridge":: Export the contents of the course in the Common Cartridge (
          .imscc) format
          "qti":: Export quizzes from a course in the QTI format
          "zip":: Export files from a course, group, or user in a zip file
        - skip_notifications (form, optional): Don't send the notifications about the export to the user. Default: false
        - select (form, optional): The select parameter allows exporting specific data. The keys are object types like '
          files',
          'folders', 'pages', etc. The value for each key is a list of object ids. An id can be an
          integer or a string.

Multiple object types can be selected in the same call. However, not all object types are
valid for every export_type. Common Cartridge supports all object types. Zip and QTI only
support the object types as described below.

"folders":: Also supported for zip export_type.
"files":: Also supported for zip export_type.
"quizzes":: Also supported for qti export_type.

- **POST** /v1/users/{user_id}/content_exports
    - Description: Export content
    - Parameters:
        - user_id (path, required): ID
        - export_type (form, required): "common_cartridge":: Export the contents of the course in the Common Cartridge (
          .imscc) format
          "qti":: Export quizzes from a course in the QTI format
          "zip":: Export files from a course, group, or user in a zip file
        - skip_notifications (form, optional): Don't send the notifications about the export to the user. Default: false
        - select (form, optional): The select parameter allows exporting specific data. The keys are object types like '
          files',
          'folders', 'pages', etc. The value for each key is a list of object ids. An id can be an
          integer or a string.

Multiple object types can be selected in the same call. However, not all object types are
valid for every export_type. Common Cartridge supports all object types. Zip and QTI only
support the object types as described below.

"folders":: Also supported for zip export_type.
"files":: Also supported for zip export_type.
"quizzes":: Also supported for qti export_type.

### Content Migrations

Path: `/content_migrations.json`

- **GET** /v1/accounts/{account_id}/content_migrations/{content_migration_id}/migration_issues
    - Description: List migration issues
    - Parameters:
        - account_id (path, required): ID
        - content_migration_id (path, required): ID

- **GET** /v1/courses/{course_id}/content_migrations/{content_migration_id}/migration_issues
    - Description: List migration issues
    - Parameters:
        - course_id (path, required): ID
        - content_migration_id (path, required): ID

- **GET** /v1/groups/{group_id}/content_migrations/{content_migration_id}/migration_issues
    - Description: List migration issues
    - Parameters:
        - group_id (path, required): ID
        - content_migration_id (path, required): ID

- **GET** /v1/users/{user_id}/content_migrations/{content_migration_id}/migration_issues
    - Description: List migration issues
    - Parameters:
        - user_id (path, required): ID
        - content_migration_id (path, required): ID

- **GET** /v1/accounts/{account_id}/content_migrations/{content_migration_id}/migration_issues/{id}
    - Description: Get a migration issue
    - Parameters:
        - account_id (path, required): ID
        - content_migration_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/content_migrations/{content_migration_id}/migration_issues/{id}
    - Description: Get a migration issue
    - Parameters:
        - course_id (path, required): ID
        - content_migration_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/groups/{group_id}/content_migrations/{content_migration_id}/migration_issues/{id}
    - Description: Get a migration issue
    - Parameters:
        - group_id (path, required): ID
        - content_migration_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/users/{user_id}/content_migrations/{content_migration_id}/migration_issues/{id}
    - Description: Get a migration issue
    - Parameters:
        - user_id (path, required): ID
        - content_migration_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/accounts/{account_id}/content_migrations/{content_migration_id}/migration_issues/{id}
    - Description: Update a migration issue
    - Parameters:
        - account_id (path, required): ID
        - content_migration_id (path, required): ID
        - id (path, required): ID
        - workflow_state (form, required): Set the workflow_state of the issue.

- **PUT** /v1/courses/{course_id}/content_migrations/{content_migration_id}/migration_issues/{id}
    - Description: Update a migration issue
    - Parameters:
        - course_id (path, required): ID
        - content_migration_id (path, required): ID
        - id (path, required): ID
        - workflow_state (form, required): Set the workflow_state of the issue.

- **PUT** /v1/groups/{group_id}/content_migrations/{content_migration_id}/migration_issues/{id}
    - Description: Update a migration issue
    - Parameters:
        - group_id (path, required): ID
        - content_migration_id (path, required): ID
        - id (path, required): ID
        - workflow_state (form, required): Set the workflow_state of the issue.

- **PUT** /v1/users/{user_id}/content_migrations/{content_migration_id}/migration_issues/{id}
    - Description: Update a migration issue
    - Parameters:
        - user_id (path, required): ID
        - content_migration_id (path, required): ID
        - id (path, required): ID
        - workflow_state (form, required): Set the workflow_state of the issue.

- **GET** /v1/accounts/{account_id}/content_migrations
    - Description: List content migrations
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/content_migrations
    - Description: List content migrations
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/content_migrations
    - Description: List content migrations
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/users/{user_id}/content_migrations
    - Description: List content migrations
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/accounts/{account_id}/content_migrations/{id}
    - Description: Get a content migration
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/content_migrations/{id}
    - Description: Get a content migration
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/groups/{group_id}/content_migrations/{id}
    - Description: Get a content migration
    - Parameters:
        - group_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/users/{user_id}/content_migrations/{id}
    - Description: Get a content migration
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/accounts/{account_id}/content_migrations
    - Description: Create a content migration
    - Parameters:
        - account_id (path, required): ID
        - migration_type (form, required): The type of the migration. Use the
          {api:ContentMigrationsController#available_migrators Migrator} endpoint to
          see all available migrators. Default allowed values:
          canvas_cartridge_importer, common_cartridge_importer,
          course_copy_importer, zip_file_importer, qti_converter, moodle_converter
        - pre_attachment[name] (form, optional): Required if uploading a file. This is the first step in uploading a
          file
          to the content migration. See the {file:file_uploads.html File Upload
          Documentation} for details on the file upload workflow.
        - pre_attachment[*] (form, optional): Other file upload properties, See {file:file_uploads.html File Upload
          Documentation}
        - settings[file_url] (form, optional): A URL to download the file from. Must not require authentication.
        - settings[content_export_id] (form, optional): The id of a ContentExport to import. This allows you to import
          content previously exported from Canvas
          without needing to download and re-upload it.
        - settings[source_course_id] (form, optional): The course to copy from for a course copy migration. (required if
          doing
          course copy)
        - settings[folder_id] (form, optional): The folder to unzip the .zip file into for a zip_file_import.
        - settings[overwrite_quizzes] (form, optional): Whether to overwrite quizzes with the same identifiers between
          content
          packages.
        - settings[question_bank_id] (form, optional): The existing question bank ID to import questions into if not
          specified in
          the content package.
        - settings[question_bank_name] (form, optional): The question bank to import questions into if not specified in
          the content
          package, if both bank id and name are set, id will take precedence.
        - settings[insert_into_module_id] (form, optional): The id of a module in the target course. This will add all
          imported items
          (that can be added to a module) to the given module.
        - settings[insert_into_module_type] (form, optional): If provided (and +insert_into_module_id+ is supplied),
          only add objects of the specified type to the module.
        - settings[insert_into_module_position] (form, optional): The (1-based) position to insert the imported items
          into the course
          (if +insert_into_module_id+ is supplied). If this parameter
          is omitted, items will be added to the end of the module.
        - settings[move_to_assignment_group_id] (form, optional): The id of an assignment group in the target course. If
          provided, all
          imported assignments will be moved to the given assignment group.
        - settings[importer_skips] (form, optional): Set of importers to skip, even if otherwise selected by migration
          settings.
        - settings[import_blueprint_settings] (form, optional): Import the "use as blueprint course" setting as well as
          the list of locked items
          from the source course or package. The destination course must not be associated
          with an existing blueprint course and cannot have any student or observer enrollments.
        - date_shift_options[shift_dates] (form, optional): Whether to shift dates in the copied course
        - date_shift_options[old_start_date] (form, optional): The original start date of the source content/course
        - date_shift_options[old_end_date] (form, optional): The original end date of the source content/course
        - date_shift_options[new_start_date] (form, optional): The new start date for the content/course
        - date_shift_options[new_end_date] (form, optional): The new end date for the source content/course
        - date_shift_options[day_substitutions][X] (form, optional): Move anything scheduled for day 'X' to the
          specified day. (0-Sunday,
          1-Monday, 2-Tuesday, 3-Wednesday, 4-Thursday, 5-Friday, 6-Saturday)
        - date_shift_options[remove_dates] (form, optional): Whether to remove dates in the copied course. Cannot be
          used
          in conjunction with *shift_dates*.
        - selective_import (form, optional): If set, perform a selective import instead of importing all content.
          The migration will identify the contents of the package and then stop
          in the +waiting_for_select+ workflow state. At this point, use the
          {api:ContentMigrationsController#content_list List items endpoint}
          to enumerate the contents of the package, identifying the copy
          parameters for the desired content. Then call the
          {api:ContentMigrationsController#update Update endpoint} and provide these
          copy parameters to start the import.
        - select (form, optional): For +course_copy_importer+ migrations, this parameter allows you to select
          the objects to copy without using the +selective_import+ argument and
          +waiting_for_select+ state as is required for uploaded imports (though that
          workflow is also supported for course copy migrations).
          The keys are object types like 'files', 'folders', 'pages', etc. The value
          for each key is a list of object ids. An id can be an integer or a string.
          Multiple object types can be selected in the same call.

- **POST** /v1/courses/{course_id}/content_migrations
    - Description: Create a content migration
    - Parameters:
        - course_id (path, required): ID
        - migration_type (form, required): The type of the migration. Use the
          {api:ContentMigrationsController#available_migrators Migrator} endpoint to
          see all available migrators. Default allowed values:
          canvas_cartridge_importer, common_cartridge_importer,
          course_copy_importer, zip_file_importer, qti_converter, moodle_converter
        - pre_attachment[name] (form, optional): Required if uploading a file. This is the first step in uploading a
          file
          to the content migration. See the {file:file_uploads.html File Upload
          Documentation} for details on the file upload workflow.
        - pre_attachment[*] (form, optional): Other file upload properties, See {file:file_uploads.html File Upload
          Documentation}
        - settings[file_url] (form, optional): A URL to download the file from. Must not require authentication.
        - settings[content_export_id] (form, optional): The id of a ContentExport to import. This allows you to import
          content previously exported from Canvas
          without needing to download and re-upload it.
        - settings[source_course_id] (form, optional): The course to copy from for a course copy migration. (required if
          doing
          course copy)
        - settings[folder_id] (form, optional): The folder to unzip the .zip file into for a zip_file_import.
        - settings[overwrite_quizzes] (form, optional): Whether to overwrite quizzes with the same identifiers between
          content
          packages.
        - settings[question_bank_id] (form, optional): The existing question bank ID to import questions into if not
          specified in
          the content package.
        - settings[question_bank_name] (form, optional): The question bank to import questions into if not specified in
          the content
          package, if both bank id and name are set, id will take precedence.
        - settings[insert_into_module_id] (form, optional): The id of a module in the target course. This will add all
          imported items
          (that can be added to a module) to the given module.
        - settings[insert_into_module_type] (form, optional): If provided (and +insert_into_module_id+ is supplied),
          only add objects of the specified type to the module.
        - settings[insert_into_module_position] (form, optional): The (1-based) position to insert the imported items
          into the course
          (if +insert_into_module_id+ is supplied). If this parameter
          is omitted, items will be added to the end of the module.
        - settings[move_to_assignment_group_id] (form, optional): The id of an assignment group in the target course. If
          provided, all
          imported assignments will be moved to the given assignment group.
        - settings[importer_skips] (form, optional): Set of importers to skip, even if otherwise selected by migration
          settings.
        - settings[import_blueprint_settings] (form, optional): Import the "use as blueprint course" setting as well as
          the list of locked items
          from the source course or package. The destination course must not be associated
          with an existing blueprint course and cannot have any student or observer enrollments.
        - date_shift_options[shift_dates] (form, optional): Whether to shift dates in the copied course
        - date_shift_options[old_start_date] (form, optional): The original start date of the source content/course
        - date_shift_options[old_end_date] (form, optional): The original end date of the source content/course
        - date_shift_options[new_start_date] (form, optional): The new start date for the content/course
        - date_shift_options[new_end_date] (form, optional): The new end date for the source content/course
        - date_shift_options[day_substitutions][X] (form, optional): Move anything scheduled for day 'X' to the
          specified day. (0-Sunday,
          1-Monday, 2-Tuesday, 3-Wednesday, 4-Thursday, 5-Friday, 6-Saturday)
        - date_shift_options[remove_dates] (form, optional): Whether to remove dates in the copied course. Cannot be
          used
          in conjunction with *shift_dates*.
        - selective_import (form, optional): If set, perform a selective import instead of importing all content.
          The migration will identify the contents of the package and then stop
          in the +waiting_for_select+ workflow state. At this point, use the
          {api:ContentMigrationsController#content_list List items endpoint}
          to enumerate the contents of the package, identifying the copy
          parameters for the desired content. Then call the
          {api:ContentMigrationsController#update Update endpoint} and provide these
          copy parameters to start the import.
        - select (form, optional): For +course_copy_importer+ migrations, this parameter allows you to select
          the objects to copy without using the +selective_import+ argument and
          +waiting_for_select+ state as is required for uploaded imports (though that
          workflow is also supported for course copy migrations).
          The keys are object types like 'files', 'folders', 'pages', etc. The value
          for each key is a list of object ids. An id can be an integer or a string.
          Multiple object types can be selected in the same call.

- **POST** /v1/groups/{group_id}/content_migrations
    - Description: Create a content migration
    - Parameters:
        - group_id (path, required): ID
        - migration_type (form, required): The type of the migration. Use the
          {api:ContentMigrationsController#available_migrators Migrator} endpoint to
          see all available migrators. Default allowed values:
          canvas_cartridge_importer, common_cartridge_importer,
          course_copy_importer, zip_file_importer, qti_converter, moodle_converter
        - pre_attachment[name] (form, optional): Required if uploading a file. This is the first step in uploading a
          file
          to the content migration. See the {file:file_uploads.html File Upload
          Documentation} for details on the file upload workflow.
        - pre_attachment[*] (form, optional): Other file upload properties, See {file:file_uploads.html File Upload
          Documentation}
        - settings[file_url] (form, optional): A URL to download the file from. Must not require authentication.
        - settings[content_export_id] (form, optional): The id of a ContentExport to import. This allows you to import
          content previously exported from Canvas
          without needing to download and re-upload it.
        - settings[source_course_id] (form, optional): The course to copy from for a course copy migration. (required if
          doing
          course copy)
        - settings[folder_id] (form, optional): The folder to unzip the .zip file into for a zip_file_import.
        - settings[overwrite_quizzes] (form, optional): Whether to overwrite quizzes with the same identifiers between
          content
          packages.
        - settings[question_bank_id] (form, optional): The existing question bank ID to import questions into if not
          specified in
          the content package.
        - settings[question_bank_name] (form, optional): The question bank to import questions into if not specified in
          the content
          package, if both bank id and name are set, id will take precedence.
        - settings[insert_into_module_id] (form, optional): The id of a module in the target course. This will add all
          imported items
          (that can be added to a module) to the given module.
        - settings[insert_into_module_type] (form, optional): If provided (and +insert_into_module_id+ is supplied),
          only add objects of the specified type to the module.
        - settings[insert_into_module_position] (form, optional): The (1-based) position to insert the imported items
          into the course
          (if +insert_into_module_id+ is supplied). If this parameter
          is omitted, items will be added to the end of the module.
        - settings[move_to_assignment_group_id] (form, optional): The id of an assignment group in the target course. If
          provided, all
          imported assignments will be moved to the given assignment group.
        - settings[importer_skips] (form, optional): Set of importers to skip, even if otherwise selected by migration
          settings.
        - settings[import_blueprint_settings] (form, optional): Import the "use as blueprint course" setting as well as
          the list of locked items
          from the source course or package. The destination course must not be associated
          with an existing blueprint course and cannot have any student or observer enrollments.
        - date_shift_options[shift_dates] (form, optional): Whether to shift dates in the copied course
        - date_shift_options[old_start_date] (form, optional): The original start date of the source content/course
        - date_shift_options[old_end_date] (form, optional): The original end date of the source content/course
        - date_shift_options[new_start_date] (form, optional): The new start date for the content/course
        - date_shift_options[new_end_date] (form, optional): The new end date for the source content/course
        - date_shift_options[day_substitutions][X] (form, optional): Move anything scheduled for day 'X' to the
          specified day. (0-Sunday,
          1-Monday, 2-Tuesday, 3-Wednesday, 4-Thursday, 5-Friday, 6-Saturday)
        - date_shift_options[remove_dates] (form, optional): Whether to remove dates in the copied course. Cannot be
          used
          in conjunction with *shift_dates*.
        - selective_import (form, optional): If set, perform a selective import instead of importing all content.
          The migration will identify the contents of the package and then stop
          in the +waiting_for_select+ workflow state. At this point, use the
          {api:ContentMigrationsController#content_list List items endpoint}
          to enumerate the contents of the package, identifying the copy
          parameters for the desired content. Then call the
          {api:ContentMigrationsController#update Update endpoint} and provide these
          copy parameters to start the import.
        - select (form, optional): For +course_copy_importer+ migrations, this parameter allows you to select
          the objects to copy without using the +selective_import+ argument and
          +waiting_for_select+ state as is required for uploaded imports (though that
          workflow is also supported for course copy migrations).
          The keys are object types like 'files', 'folders', 'pages', etc. The value
          for each key is a list of object ids. An id can be an integer or a string.
          Multiple object types can be selected in the same call.

- **POST** /v1/users/{user_id}/content_migrations
    - Description: Create a content migration
    - Parameters:
        - user_id (path, required): ID
        - migration_type (form, required): The type of the migration. Use the
          {api:ContentMigrationsController#available_migrators Migrator} endpoint to
          see all available migrators. Default allowed values:
          canvas_cartridge_importer, common_cartridge_importer,
          course_copy_importer, zip_file_importer, qti_converter, moodle_converter
        - pre_attachment[name] (form, optional): Required if uploading a file. This is the first step in uploading a
          file
          to the content migration. See the {file:file_uploads.html File Upload
          Documentation} for details on the file upload workflow.
        - pre_attachment[*] (form, optional): Other file upload properties, See {file:file_uploads.html File Upload
          Documentation}
        - settings[file_url] (form, optional): A URL to download the file from. Must not require authentication.
        - settings[content_export_id] (form, optional): The id of a ContentExport to import. This allows you to import
          content previously exported from Canvas
          without needing to download and re-upload it.
        - settings[source_course_id] (form, optional): The course to copy from for a course copy migration. (required if
          doing
          course copy)
        - settings[folder_id] (form, optional): The folder to unzip the .zip file into for a zip_file_import.
        - settings[overwrite_quizzes] (form, optional): Whether to overwrite quizzes with the same identifiers between
          content
          packages.
        - settings[question_bank_id] (form, optional): The existing question bank ID to import questions into if not
          specified in
          the content package.
        - settings[question_bank_name] (form, optional): The question bank to import questions into if not specified in
          the content
          package, if both bank id and name are set, id will take precedence.
        - settings[insert_into_module_id] (form, optional): The id of a module in the target course. This will add all
          imported items
          (that can be added to a module) to the given module.
        - settings[insert_into_module_type] (form, optional): If provided (and +insert_into_module_id+ is supplied),
          only add objects of the specified type to the module.
        - settings[insert_into_module_position] (form, optional): The (1-based) position to insert the imported items
          into the course
          (if +insert_into_module_id+ is supplied). If this parameter
          is omitted, items will be added to the end of the module.
        - settings[move_to_assignment_group_id] (form, optional): The id of an assignment group in the target course. If
          provided, all
          imported assignments will be moved to the given assignment group.
        - settings[importer_skips] (form, optional): Set of importers to skip, even if otherwise selected by migration
          settings.
        - settings[import_blueprint_settings] (form, optional): Import the "use as blueprint course" setting as well as
          the list of locked items
          from the source course or package. The destination course must not be associated
          with an existing blueprint course and cannot have any student or observer enrollments.
        - date_shift_options[shift_dates] (form, optional): Whether to shift dates in the copied course
        - date_shift_options[old_start_date] (form, optional): The original start date of the source content/course
        - date_shift_options[old_end_date] (form, optional): The original end date of the source content/course
        - date_shift_options[new_start_date] (form, optional): The new start date for the content/course
        - date_shift_options[new_end_date] (form, optional): The new end date for the source content/course
        - date_shift_options[day_substitutions][X] (form, optional): Move anything scheduled for day 'X' to the
          specified day. (0-Sunday,
          1-Monday, 2-Tuesday, 3-Wednesday, 4-Thursday, 5-Friday, 6-Saturday)
        - date_shift_options[remove_dates] (form, optional): Whether to remove dates in the copied course. Cannot be
          used
          in conjunction with *shift_dates*.
        - selective_import (form, optional): If set, perform a selective import instead of importing all content.
          The migration will identify the contents of the package and then stop
          in the +waiting_for_select+ workflow state. At this point, use the
          {api:ContentMigrationsController#content_list List items endpoint}
          to enumerate the contents of the package, identifying the copy
          parameters for the desired content. Then call the
          {api:ContentMigrationsController#update Update endpoint} and provide these
          copy parameters to start the import.
        - select (form, optional): For +course_copy_importer+ migrations, this parameter allows you to select
          the objects to copy without using the +selective_import+ argument and
          +waiting_for_select+ state as is required for uploaded imports (though that
          workflow is also supported for course copy migrations).
          The keys are object types like 'files', 'folders', 'pages', etc. The value
          for each key is a list of object ids. An id can be an integer or a string.
          Multiple object types can be selected in the same call.

- **PUT** /v1/accounts/{account_id}/content_migrations/{id}
    - Description: Update a content migration
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/courses/{course_id}/content_migrations/{id}
    - Description: Update a content migration
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/groups/{group_id}/content_migrations/{id}
    - Description: Update a content migration
    - Parameters:
        - group_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/users/{user_id}/content_migrations/{id}
    - Description: Update a content migration
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/content_migrations/migrators
    - Description: List Migration Systems
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/content_migrations/migrators
    - Description: List Migration Systems
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/content_migrations/migrators
    - Description: List Migration Systems
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/users/{user_id}/content_migrations/migrators
    - Description: List Migration Systems
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/accounts/{account_id}/content_migrations/{id}/selective_data
    - Description: List items for selective import
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - type (query, optional): The type of content to enumerate.

- **GET** /v1/courses/{course_id}/content_migrations/{id}/selective_data
    - Description: List items for selective import
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - type (query, optional): The type of content to enumerate.

- **GET** /v1/groups/{group_id}/content_migrations/{id}/selective_data
    - Description: List items for selective import
    - Parameters:
        - group_id (path, required): ID
        - id (path, required): ID
        - type (query, optional): The type of content to enumerate.

- **GET** /v1/users/{user_id}/content_migrations/{id}/selective_data
    - Description: List items for selective import
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID
        - type (query, optional): The type of content to enumerate.

- **GET** /v1/courses/{course_id}/content_migrations/{id}/asset_id_mapping
    - Description: Get asset id mapping
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

### Content Security Policy Settings

Path: `/content_security_policy_settings.json`

- **GET** /v1/courses/{course_id}/csp_settings
    - Description: Get current settings for account or course
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/accounts/{account_id}/csp_settings
    - Description: Get current settings for account or course
    - Parameters:
        - account_id (path, required): ID

- **PUT** /v1/courses/{course_id}/csp_settings
    - Description: Enable, disable, or clear explicit CSP setting
    - Parameters:
        - course_id (path, required): ID
        - status (form, required): If set to "enabled" for an account, CSP will be enabled for all its courses and
          sub-accounts (that
          have not explicitly enabled or disabled it), using the allowed domains set on this account.
          If set to "disabled", CSP will be disabled for this account or course and for all sub-accounts
          that have not explicitly re-enabled it.
          If set to "inherited", this account or course will reset to the default state where CSP settings
          are inherited from the first parent account to have them explicitly set.

- **PUT** /v1/accounts/{account_id}/csp_settings
    - Description: Enable, disable, or clear explicit CSP setting
    - Parameters:
        - account_id (path, required): ID
        - status (form, required): If set to "enabled" for an account, CSP will be enabled for all its courses and
          sub-accounts (that
          have not explicitly enabled or disabled it), using the allowed domains set on this account.
          If set to "disabled", CSP will be disabled for this account or course and for all sub-accounts
          that have not explicitly re-enabled it.
          If set to "inherited", this account or course will reset to the default state where CSP settings
          are inherited from the first parent account to have them explicitly set.

- **PUT** /v1/accounts/{account_id}/csp_settings/lock
    - Description: Lock or unlock current CSP settings for sub-accounts and courses
    - Parameters:
        - account_id (path, required): ID
        - settings_locked (form, required): Whether sub-accounts and courses will be prevented from overriding settings
          inherited from this account.

- **POST** /v1/accounts/{account_id}/csp_settings/domains
    - Description: Add an allowed domain to account
    - Parameters:
        - account_id (path, required): ID
        - domain (form, required): no description

- **POST** /v1/accounts/{account_id}/csp_settings/domains/batch_create
    - Description: Add multiple allowed domains to an account
    - Parameters:
        - account_id (path, required): ID
        - domains (form, required): no description

- **DELETE** /v1/accounts/{account_id}/csp_settings/domains
    - Description: Remove a domain from account
    - Parameters:
        - account_id (path, required): ID
        - domain (query, required): no description

### Content Shares

Path: `/content_shares.json`

- **POST** /v1/users/{user_id}/content_shares
    - Description: Create a content share
    - Parameters:
        - user_id (path, required): ID
        - receiver_ids (form, required): IDs of users to share the content with.
        - content_type (form, required): Type of content you are sharing.
        - content_id (form, required): The id of the content that you are sharing

- **GET** /v1/users/{user_id}/content_shares/sent
    - Description: List content shares
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/users/{user_id}/content_shares/received
    - Description: List content shares
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/users/{user_id}/content_shares/unread_count
    - Description: Get unread shares count
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/users/{user_id}/content_shares/{id}
    - Description: Get content share
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/users/{user_id}/content_shares/{id}
    - Description: Remove content share
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/users/{user_id}/content_shares/{id}/add_users
    - Description: Add users to content share
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID
        - receiver_ids (form, optional): IDs of users to share the content with.

- **PUT** /v1/users/{user_id}/content_shares/{id}
    - Description: Update a content share
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID
        - read_state (form, optional): Read state for the content share

### Conversations

Path: `/conversations.json`

- **GET** /v1/conversations
    - Description: List conversations
    - Parameters:
        - scope (query, optional): When set, only return conversations of the specified type. For example,
          set to "unread" to return only conversations that haven't been read.
          The default behavior is to return all non-archived conversations (i.e.
          read and unread).
        - filter (query, optional): When set, only return conversations for the specified courses, groups
          or users. The id should be prefixed with its type, e.g. "user_123" or
          "course_456". Can be an array (by setting "filter[]") or single value
          (by setting "filter")
        - filter_mode (query, optional): When filter[] contains multiple filters, combine them with this mode,
          filtering conversations that at have at least all of the contexts ("and")
          or at least one of the contexts ("or")
        - interleave_submissions (query, optional): (Obsolete) Submissions are no
          longer linked to conversations. This parameter is ignored.
        - include_all_conversation_ids (query, optional): Default is false. If true,
          the top-level element of the response will be an object rather than
          an array, and will have the keys "conversations" which will contain the
          paged conversation data, and "conversation_ids" which will contain the
          ids of all conversations under this scope/filter in the same order.
        - include (query, optional): "participant_avatars":: Optionally include an "avatar_url" key for each user
          participanting in the conversation

- **POST** /v1/conversations
    - Description: Create a conversation
    - Parameters:
        - recipients (form, required): An array of recipient ids. These may be user ids or course/group ids
          prefixed with "course_" or "group_" respectively, e.g.
          recipients[]=1&recipients[]=2&recipients[]=course_3. If the course/group
          has over 100 enrollments, 'bulk_message' and 'group_conversation' must be
          set to true.
        - subject (form, optional): The subject of the conversation. This is ignored when reusing a
          conversation. Maximum length is 255 characters.
        - body (form, required): The message to be sent
        - force_new (form, optional): Forces a new message to be created, even if there is an existing private
          conversation.
        - group_conversation (form, optional): Defaults to false. When false, individual private conversations will be
          created with each recipient. If true, this will be a group conversation
          (i.e. all recipients may see all messages and replies). Must be set true if
          the number of recipients is over the set maximum (default is 100).
        - attachment_ids (form, optional): An array of attachments ids. These must be files that have been previously
          uploaded to the sender's "conversation attachments" folder.
        - media_comment_id (form, optional): Media comment id of an audio or video file to be associated with this
          message.
        - media_comment_type (form, optional): Type of the associated media file
        - mode (form, optional): Determines whether the messages will be created/sent synchronously or
          asynchronously. Defaults to sync, and this option is ignored if this is a
          group conversation or there is just one recipient (i.e. it must be a bulk
          private message). When sent async, the response will be an empty array
          (batch status can be queried via the {api:ConversationsController#batches batches API})
        - scope (form, optional): Used when generating "visible" in the API response. See the explanation
          under the {api:ConversationsController#index index API action}
        - filter (form, optional): Used when generating "visible" in the API response. See the explanation
          under the {api:ConversationsController#index index API action}
        - filter_mode (form, optional): Used when generating "visible" in the API response. See the explanation
          under the {api:ConversationsController#index index API action}
        - context_code (form, optional): The course or group that is the context for this conversation. Same format
          as courses or groups in the recipients argument.

- **GET** /v1/conversations/batches
    - Description: Get running batches

- **GET** /v1/conversations/{id}
    - Description: Get a single conversation
    - Parameters:
        - id (path, required): ID
        - interleave_submissions (query, optional): (Obsolete) Submissions are no
          longer linked to conversations. This parameter is ignored.
        - scope (query, optional): Used when generating "visible" in the API response. See the explanation
          under the {api:ConversationsController#index index API action}
        - filter (query, optional): Used when generating "visible" in the API response. See the explanation
          under the {api:ConversationsController#index index API action}
        - filter_mode (query, optional): Used when generating "visible" in the API response. See the explanation
          under the {api:ConversationsController#index index API action}
        - auto_mark_as_read (query, optional): Default true. If true, unread
          conversations will be automatically marked as read. This will default
          to false in a future API release, so clients should explicitly send
          true if that is the desired behavior.

- **PUT** /v1/conversations/{id}
    - Description: Edit a conversation
    - Parameters:
        - id (path, required): ID
        - conversation[workflow_state] (form, optional): Change the state of this conversation
        - conversation[subscribed] (form, optional): Toggle the current user's subscription to the conversation (only
          valid for
          group conversations). If unsubscribed, the user will still have access to
          the latest messages, but the conversation won't be automatically flagged
          as unread, nor will it jump to the top of the inbox.
        - conversation[starred] (form, optional): Toggle the starred state of the current user's view of the
          conversation.
        - scope (form, optional): Used when generating "visible" in the API response. See the explanation
          under the {api:ConversationsController#index index API action}
        - filter (form, optional): Used when generating "visible" in the API response. See the explanation
          under the {api:ConversationsController#index index API action}
        - filter_mode (form, optional): Used when generating "visible" in the API response. See the explanation
          under the {api:ConversationsController#index index API action}

- **POST** /v1/conversations/mark_all_as_read
    - Description: Mark all as read

- **DELETE** /v1/conversations/{id}
    - Description: Delete a conversation
    - Parameters:
        - id (path, required): ID

- **POST** /v1/conversations/{id}/add_recipients
    - Description: Add recipients
    - Parameters:
        - id (path, required): ID
        - recipients (form, required): An array of recipient ids. These may be user ids or course/group ids
          prefixed with "course_" or "group_" respectively, e.g.
          recipients[]=1&recipients[]=2&recipients[]=course_3

- **POST** /v1/conversations/{id}/add_message
    - Description: Add a message
    - Parameters:
        - id (path, required): ID
        - body (form, required): The message to be sent.
        - attachment_ids (form, optional): An array of attachments ids. These must be files that have been previously
          uploaded to the sender's "conversation attachments" folder.
        - media_comment_id (form, optional): Media comment id of an audio of video file to be associated with this
          message.
        - media_comment_type (form, optional): Type of the associated media file.
        - recipients (form, optional): no description
        - included_messages (form, optional): no description

- **POST** /v1/conversations/{id}/remove_messages
    - Description: Delete a message
    - Parameters:
        - id (path, required): ID
        - remove (form, required): Array of message ids to be deleted

- **PUT** /v1/conversations
    - Description: Batch update conversations
    - Parameters:
        - conversation_ids (form, required): List of conversations to update. Limited to 500 conversations.
        - event (form, required): The action to take on each conversation.

- **GET** /v1/conversations/find_recipients
    - Description: Find recipients

- **GET** /v1/conversations/unread_count
    - Description: Unread count

### Course Audit log

Path: `/course_audit_log.json`

- **GET** /v1/audit/course/courses/{course_id}
    - Description: Query by course.
    - Parameters:
        - course_id (path, required): ID
        - start_time (query, optional): The beginning of the time range from which you want events.
        - end_time (query, optional): The end of the time range from which you want events.

- **GET** /v1/audit/course/accounts/{account_id}
    - Description: Query by account.
    - Parameters:
        - account_id (path, required): ID
        - start_time (query, optional): The beginning of the time range from which you want events.
        - end_time (query, optional): The end of the time range from which you want events.

### Course Pace

Path: `/course_pace.json`

- **GET** /v1/courses/{course_id}/course_pacing/{id}
    - Description: Show a Course pace
    - Parameters:
        - id (path, required): ID
        - course_id (path, required): The id of the course
        - course_pace_id (query, required): The id of the course_pace

- **POST** /v1/courses/{course_id}/course_pacing
    - Description: Create a Course pace
    - Parameters:
        - course_id (path, required): The id of the course
        - end_date (form, optional): End date of the course pace
        - end_date_context (form, optional): End date context (course, section, hupothetical)
        - start_date (form, optional): Start date of the course pace
        - start_date_context (form, optional): Start date context (course, section, hupothetical)
        - exclude_weekends (form, optional): Course pace dates excludes weekends if true
        - hard_end_dates (form, optional): Course pace uess hard end dates if true
        - workflow_state (form, optional): The state of the course pace
        - course_pace_module_item_attributes (form, optional): Module Items attributes
        - context_id (form, optional): Pace Context ID
        - context_type (form, optional): Pace Context Type (Course, Section, User)

- **PUT** /v1/courses/{course_id}/course_pacing/{id}
    - Description: Update a Course pace
    - Parameters:
        - id (path, required): ID
        - course_id (path, required): The id of the course
        - course_pace_id (form, required): The id of the course pace
        - end_date (form, optional): End date of the course pace
        - exclude_weekends (form, optional): Course pace dates excludes weekends if true
        - hard_end_dates (form, optional): Course pace uess hard end dates if true
        - workflow_state (form, optional): The state of the course pace
        - course_pace_module_item_attributes (form, optional): Module Items attributes

- **DELETE** /v1/courses/{course_id}/course_pacing/{id}
    - Description: Delete a Course pace
    - Parameters:
        - id (path, required): ID
        - course_id (path, required): The id of the course
        - course_pace_id (query, required): The id of the course_pace

### Course Quiz Extensions

Path: `/course_quiz_extensions.json`

- **POST** /v1/courses/{course_id}/quiz_extensions
    - Description: Set extensions for student quiz submissions
    - Parameters:
        - course_id (path, required): ID
        - user_id (form, required): The ID of the user we want to add quiz extensions for.
        - extra_attempts (form, optional): Number of times the student is allowed to re-take the quiz over the
          multiple-attempt limit. This is limited to 1000 attempts or less.
        - extra_time (form, optional): The number of extra minutes to allow for all attempts. This will
          add to the existing time limit on the submission. This is limited to
          10080 minutes (1 week)
        - manually_unlocked (form, optional): Allow the student to take the quiz even if it's locked for
          everyone else.
        - extend_from_now (form, optional): The number of minutes to extend the quiz from the current time. This is
          mutually exclusive to extend_from_end_at. This is limited to 1440
          minutes (24 hours)
        - extend_from_end_at (form, optional): The number of minutes to extend the quiz beyond the quiz's current
          ending time. This is mutually exclusive to extend_from_now. This is
          limited to 1440 minutes (24 hours)

### Courses

Path: `/courses.json`

- **GET** /v1/courses
    - Description: List your courses
    - Parameters:
        - enrollment_type (query, optional): When set, only return courses where the user is enrolled as this type. For
          example, set to "teacher" to return only courses where the user is
          enrolled as a Teacher. This argument is ignored if enrollment_role is given.
        - enrollment_role (query, optional): Deprecated
          When set, only return courses where the user is enrolled with the specified
          course-level role. This can be a role created with the
          {api:RoleOverridesController#add_role Add Role API} or a base role type of
          'StudentEnrollment', 'TeacherEnrollment', 'TaEnrollment', 'ObserverEnrollment',
          or 'DesignerEnrollment'.
        - enrollment_role_id (query, optional): When set, only return courses where the user is enrolled with the
          specified
          course-level role. This can be a role created with the
          {api:RoleOverridesController#add_role Add Role API} or a built_in role type of
          'StudentEnrollment', 'TeacherEnrollment', 'TaEnrollment', 'ObserverEnrollment',
          or 'DesignerEnrollment'.
        - enrollment_state (query, optional): When set, only return courses where the user has an enrollment with the
          given state.
          This will respect section/course/term date overrides.
        - exclude_blueprint_courses (query, optional): When set, only return courses that are not configured as
          blueprint courses.
        - include (query, optional): - "needs_grading_count": Optional information to include with each Course.
          When needs_grading_count is given, and the current user has grading
          rights, the total number of submissions needing grading for all
          assignments is returned.
- "syllabus_body": Optional information to include with each Course.
  When syllabus_body is given the user-generated html for the course
  syllabus is returned.
- "public_description": Optional information to include with each Course.
  When public_description is given the user-generated text for the course
  public description is returned.
- "total_scores": Optional information to include with each Course.
  When total_scores is given, any student enrollments will also
  include the fields 'computed_current_score', 'computed_final_score',
  'computed_current_grade', and 'computed_final_grade', as well as (if
  the user has permission) 'unposted_current_score',
  'unposted_final_score', 'unposted_current_grade', and
  'unposted_final_grade' (see Enrollment documentation for more
  information on these fields). This argument is ignored if the course is
  configured to hide final grades.
- "current_grading_period_scores": Optional information to include with
  each Course. When current_grading_period_scores is given and total_scores
  is given, any student enrollments will also include the fields
  'has_grading_periods',
  'totals_for_all_grading_periods_option', 'current_grading_period_title',
  'current_grading_period_id', current_period_computed_current_score',
  'current_period_computed_final_score',
  'current_period_computed_current_grade', and
  'current_period_computed_final_grade', as well as (if the user has permission)
  'current_period_unposted_current_score',
  'current_period_unposted_final_score',
  'current_period_unposted_current_grade', and
  'current_period_unposted_final_grade' (see Enrollment documentation for
  more information on these fields). In addition, when this argument is
  passed, the course will have a 'has_grading_periods' attribute
  on it. This argument is ignored if the total_scores argument is not
  included. If the course is configured to hide final grades, the
  following fields are not returned:
  'totals_for_all_grading_periods_option',
  'current_period_computed_current_score',
  'current_period_computed_final_score',
  'current_period_computed_current_grade',
  'current_period_computed_final_grade',
  'current_period_unposted_current_score',
  'current_period_unposted_final_score',
  'current_period_unposted_current_grade', and
  'current_period_unposted_final_grade'
- "grading_periods": Optional information to include with each Course. When
  grading_periods is given, a list of the grading periods associated with
  each course is returned.
- "term": Optional information to include with each Course. When
  term is given, the information for the enrollment term for each course
  is returned.
- "account": Optional information to include with each Course. When
  account is given, the account json for each course is returned.
- "course_progress": Optional information to include with each Course.
  When course_progress is given, each course will include a
  'course_progress' object with the fields: 'requirement_count', an integer
  specifying the total number of requirements in the course,
  'requirement_completed_count', an integer specifying the total number of
  requirements in this course that have been completed, and
  'next_requirement_url', a string url to the next requirement item, and
  'completed_at', the date the course was completed (null if incomplete).
  'next_requirement_url' will be null if all requirements have been
  completed or the current module does not require sequential progress.
  "course_progress" will return an error message if the course is not
  module based or the user is not enrolled as a student in the course.
- "sections": Section enrollment information to include with each Course.
  Returns an array of hashes containing the section ID (id), section name
  (name), start and end dates (start_at, end_at), as well as the enrollment
  type (enrollment_role, e.g. 'StudentEnrollment').
- "storage_quota_used_mb": The amount of storage space used by the files in this course
- "total_students": Optional information to include with each Course.
  Returns an integer for the total amount of active and invited students.
- "passback_status": Include the grade passback_status
- "favorites": Optional information to include with each Course.
  Indicates if the user has marked the course as a favorite course.
- "teachers": Teacher information to include with each Course.
  Returns an array of hashes containing the {api:Users:UserDisplay UserDisplay} information
  for each teacher in the course.
- "observed_users": Optional information to include with each Course.
  Will include data for observed users if the current user has an
  observer enrollment.
- "tabs": Optional information to include with each Course.
  Will include the list of tabs configured for each course. See the
  {api:TabsController#index List available tabs API} for more information.
- "course_image": Optional information to include with each Course. Returns course
  image url if a course image has been set.
- "banner_image": Optional information to include with each Course. Returns course
  banner image url if the course is a Canvas for Elementary subject and a banner
  image has been set.
- "concluded": Optional information to include with each Course. Indicates whether
  the course has been concluded, taking course and term dates into account.
- "post_manually": Optional information to include with each Course. Returns true if
  the course post policy is set to Manually post grades. Returns false if the the course
  post policy is set to Automatically post grades.
    - state (query, optional): If set, only return courses that are in the given state(s).
      By default, "available" is returned for students and observers, and
      anything except "deleted", for all other enrollment types

- **GET** /v1/users/{user_id}/courses
    - Description: List courses for a user
    - Parameters:
        - user_id (path, required): ID
        - include (query, optional): - "needs_grading_count": Optional information to include with each Course.
          When needs_grading_count is given, and the current user has grading
          rights, the total number of submissions needing grading for all
          assignments is returned.
- "syllabus_body": Optional information to include with each Course.
  When syllabus_body is given the user-generated html for the course
  syllabus is returned.
- "public_description": Optional information to include with each Course.
  When public_description is given the user-generated text for the course
  public description is returned.
- "total_scores": Optional information to include with each Course.
  When total_scores is given, any student enrollments will also
  include the fields 'computed_current_score', 'computed_final_score',
  'computed_current_grade', and 'computed_final_grade' (see Enrollment
  documentation for more information on these fields). This argument
  is ignored if the course is configured to hide final grades.
- "current_grading_period_scores": Optional information to include with
  each Course. When current_grading_period_scores is given and total_scores
  is given, any student enrollments will also include the fields
  'has_grading_periods',
  'totals_for_all_grading_periods_option', 'current_grading_period_title',
  'current_grading_period_id', current_period_computed_current_score',
  'current_period_computed_final_score',
  'current_period_computed_current_grade', and
  'current_period_computed_final_grade', as well as (if the user has permission)
  'current_period_unposted_current_score',
  'current_period_unposted_final_score',
  'current_period_unposted_current_grade', and
  'current_period_unposted_final_grade' (see Enrollment documentation for
  more information on these fields). In addition, when this argument is
  passed, the course will have a 'has_grading_periods' attribute
  on it. This argument is ignored if the course is configured to hide final
  grades or if the total_scores argument is not included.
- "grading_periods": Optional information to include with each Course. When
  grading_periods is given, a list of the grading periods associated with
  each course is returned.
- "term": Optional information to include with each Course. When
  term is given, the information for the enrollment term for each course
  is returned.
- "account": Optional information to include with each Course. When
  account is given, the account json for each course is returned.
- "course_progress": Optional information to include with each Course.
  When course_progress is given, each course will include a
  'course_progress' object with the fields: 'requirement_count', an integer
  specifying the total number of requirements in the course,
  'requirement_completed_count', an integer specifying the total number of
  requirements in this course that have been completed, and
  'next_requirement_url', a string url to the next requirement item, and
  'completed_at', the date the course was completed (null if incomplete).
  'next_requirement_url' will be null if all requirements have been
  completed or the current module does not require sequential progress.
  "course_progress" will return an error message if the course is not
  module based or the user is not enrolled as a student in the course.
- "sections": Section enrollment information to include with each Course.
  Returns an array of hashes containing the section ID (id), section name
  (name), start and end dates (start_at, end_at), as well as the enrollment
  type (enrollment_role, e.g. 'StudentEnrollment').
- "storage_quota_used_mb": The amount of storage space used by the files in this course
- "total_students": Optional information to include with each Course.
  Returns an integer for the total amount of active and invited students.
- "passback_status": Include the grade passback_status
- "favorites": Optional information to include with each Course.
  Indicates if the user has marked the course as a favorite course.
- "teachers": Teacher information to include with each Course.
  Returns an array of hashes containing the {api:Users:UserDisplay UserDisplay} information
  for each teacher in the course.
- "observed_users": Optional information to include with each Course.
  Will include data for observed users if the current user has an
  observer enrollment.
- "tabs": Optional information to include with each Course.
  Will include the list of tabs configured for each course. See the
  {api:TabsController#index List available tabs API} for more information.
- "course_image": Optional information to include with each Course. Returns course
  image url if a course image has been set.
- "banner_image": Optional information to include with each Course. Returns course
  banner image url if the course is a Canvas for Elementary subject and a banner
  image has been set.
- "concluded": Optional information to include with each Course. Indicates whether
  the course has been concluded, taking course and term dates into account.
- "post_manually": Optional information to include with each Course. Returns true if
  the course post policy is set to "Manually". Returns false if the the course post
  policy is set to "Automatically".
    - state (query, optional): If set, only return courses that are in the given state(s).
      By default, "available" is returned for students and observers, and
      anything except "deleted", for all other enrollment types
    - enrollment_state (query, optional): When set, only return courses where the user has an enrollment with the given
      state.
      This will respect section/course/term date overrides.
    - homeroom (query, optional): If set, only return homeroom courses.
    - account_id (query, optional): If set, only include courses associated with this account

- **GET** /v1/courses/{course_id}/users/{user_id}/progress
    - Description: Get user progress
    - Parameters:
        - course_id (path, required): ID
        - user_id (path, required): ID

- **POST** /v1/accounts/{account_id}/courses
    - Description: Create a new course
    - Parameters:
        - account_id (path, required): ID
        - course[name] (form, optional): The name of the course. If omitted, the course will be named "Unnamed
          Course."
        - course[course_code] (form, optional): The course code for the course.
        - course[start_at] (form, optional): Course start date in ISO8601 format, e.g. 2011-01-01T01:00Z
          This value is ignored unless 'restrict_enrollments_to_course_dates' is set to true.
        - course[end_at] (form, optional): Course end date in ISO8601 format. e.g. 2011-01-01T01:00Z
          This value is ignored unless 'restrict_enrollments_to_course_dates' is set to true.
        - course[license] (form, optional): The name of the licensing. Should be one of the following abbreviations
          (a descriptive name is included in parenthesis for reference):
- 'private' (Private Copyrighted)
- 'cc_by_nc_nd' (CC Attribution Non-Commercial No Derivatives)
- 'cc_by_nc_sa' (CC Attribution Non-Commercial Share Alike)
- 'cc_by_nc' (CC Attribution Non-Commercial)
- 'cc_by_nd' (CC Attribution No Derivatives)
- 'cc_by_sa' (CC Attribution Share Alike)
- 'cc_by' (CC Attribution)
- 'public_domain' (Public Domain).
    - course[is_public] (form, optional): Set to true if course is public to both authenticated and unauthenticated
      users.
    - course[is_public_to_auth_users] (form, optional): Set to true if course is public only to authenticated users.
    - course[public_syllabus] (form, optional): Set to true to make the course syllabus public.
    - course[public_syllabus_to_auth] (form, optional): Set to true to make the course syllabus public for authenticated
      users.
    - course[public_description] (form, optional): A publicly visible description of the course.
    - course[allow_student_wiki_edits] (form, optional): If true, students will be able to modify the course wiki.
    - course[allow_wiki_comments] (form, optional): If true, course members will be able to comment on wiki pages.
    - course[allow_student_forum_attachments] (form, optional): If true, students can attach files to forum posts.
    - course[open_enrollment] (form, optional): Set to true if the course is open enrollment.
    - course[self_enrollment] (form, optional): Set to true if the course is self enrollment.
    - course[restrict_enrollments_to_course_dates] (form, optional): Set to true to restrict user enrollments to the
      start and end dates of the
      course. This value must be set to true
      in order to specify a course start date and/or end date.
    - course[term_id] (form, optional): The unique ID of the term to create to course in.
    - course[sis_course_id] (form, optional): The unique SIS identifier.
    - course[integration_id] (form, optional): The unique Integration identifier.
    - course[hide_final_grades] (form, optional): If this option is set to true, the totals in student grades summary
      will
      be hidden.
    - course[apply_assignment_group_weights] (form, optional): Set to true to weight final grade based on assignment
      groups percentages.
    - course[time_zone] (form, optional): The time zone for the course. Allowed time zones are
      {http://www.iana.org/time-zones IANA time zones} or friendlier
      {http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html Ruby on Rails time zones}.
    - offer (form, optional): If this option is set to true, the course will be available to students
      immediately.
    - enroll_me (form, optional): Set to true to enroll the current user as the teacher.
    - course[default_view] (form, optional): The type of page that users will see when they first visit the course

* 'feed' Recent Activity Dashboard
* 'modules' Course Modules/Sections Page
* 'assignments' Course Assignments List
* 'syllabus' Course Syllabus Page
  other types may be added in the future
    - course[syllabus_body] (form, optional): The syllabus body for the course
    - course[grading_standard_id] (form, optional): The grading standard id to set for the course. If no value is
      provided for this argument the current grading_standard will be un-set from this course.
    - course[grade_passback_setting] (form, optional): Optional. The grade_passback_setting for the course. Only '
      nightly_sync', 'disabled', and '' are allowed
    - course[course_format] (form, optional): Optional. Specifies the format of the course. (Should be 'on_campus', '
      online', or 'blended')
    - course[post_manually] (form, optional): Default is false.
      When true, all grades in the course must be posted manually, and will not be automatically posted.
      When false, all grades in the course will be automatically posted.
    - enable_sis_reactivation (form, optional): When true, will first try to re-activate a deleted course with matching
      sis_course_id if possible.

- **POST** /v1/courses/{course_id}/files
    - Description: Upload a file
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/students
    - Description: List students
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/users
    - Description: List users in course
    - Parameters:
        - course_id (path, required): ID
        - search_term (query, optional): The partial name or full ID of the users to match and return in the results
          list.
        - sort (query, optional): When set, sort the results of the search based on the given field.
        - enrollment_type (query, optional): When set, only return users where the user is enrolled as this type.
          "student_view" implies include[]=test_student.
          This argument is ignored if enrollment_role is given.
        - enrollment_role (query, optional): Deprecated
          When set, only return users enrolled with the specified course-level role. This can be
          a role created with the {api:RoleOverridesController#add_role Add Role API} or a
          base role type of 'StudentEnrollment', 'TeacherEnrollment', 'TaEnrollment',
          'ObserverEnrollment', or 'DesignerEnrollment'.
        - enrollment_role_id (query, optional): When set, only return courses where the user is enrolled with the
          specified
          course-level role. This can be a role created with the
          {api:RoleOverridesController#add_role Add Role API} or a built_in role id with type
          'StudentEnrollment', 'TeacherEnrollment', 'TaEnrollment', 'ObserverEnrollment',
          or 'DesignerEnrollment'.
        - include (query, optional): - "enrollments":
          Optionally include with each Course the user's current and invited
          enrollments. If the user is enrolled as a student, and the account has
          permission to manage or view all grades, each enrollment will include a
          'grades' key with 'current_score', 'final_score', 'current_grade' and
          'final_grade' values.
- "locked": Optionally include whether an enrollment is locked.
- "avatar_url": Optionally include avatar_url.
- "bio": Optionally include each user's bio.
- "test_student": Optionally include the course's Test Student,
  if present. Default is to not include Test Student.
- "custom_links": Optionally include plugin-supplied custom links for each student,
  such as analytics information
- "current_grading_period_scores": if enrollments is included as
  well as this directive, the scores returned in the enrollment
  will be for the current grading period if there is one. A
  'grading_period_id' value will also be included with the
  scores. if grading_period_id is nil there is no current grading
  period and the score is a total score.
- "uuid": Optionally include the users uuid
    - user_id (query, optional): If this parameter is given and it corresponds to a user in the course,
      the +page+ parameter will be ignored and the page containing the specified user
      will be returned instead.
    - user_ids (query, optional): If included, the course users set will only include users with IDs
      specified by the param. Note: this will not work in conjunction
      with the "user_id" argument but multiple user_ids can be included.
    - enrollment_state (query, optional): When set, only return users where the enrollment workflow state is of one of
      the given types.
      "active" and "invited" enrollments are returned by default.

- **GET** /v1/courses/{course_id}/search_users
    - Description: List users in course
    - Parameters:
        - course_id (path, required): ID
        - search_term (query, optional): The partial name or full ID of the users to match and return in the results
          list.
        - sort (query, optional): When set, sort the results of the search based on the given field.
        - enrollment_type (query, optional): When set, only return users where the user is enrolled as this type.
          "student_view" implies include[]=test_student.
          This argument is ignored if enrollment_role is given.
        - enrollment_role (query, optional): Deprecated
          When set, only return users enrolled with the specified course-level role. This can be
          a role created with the {api:RoleOverridesController#add_role Add Role API} or a
          base role type of 'StudentEnrollment', 'TeacherEnrollment', 'TaEnrollment',
          'ObserverEnrollment', or 'DesignerEnrollment'.
        - enrollment_role_id (query, optional): When set, only return courses where the user is enrolled with the
          specified
          course-level role. This can be a role created with the
          {api:RoleOverridesController#add_role Add Role API} or a built_in role id with type
          'StudentEnrollment', 'TeacherEnrollment', 'TaEnrollment', 'ObserverEnrollment',
          or 'DesignerEnrollment'.
        - include (query, optional): - "enrollments":
          Optionally include with each Course the user's current and invited
          enrollments. If the user is enrolled as a student, and the account has
          permission to manage or view all grades, each enrollment will include a
          'grades' key with 'current_score', 'final_score', 'current_grade' and
          'final_grade' values.
- "locked": Optionally include whether an enrollment is locked.
- "avatar_url": Optionally include avatar_url.
- "bio": Optionally include each user's bio.
- "test_student": Optionally include the course's Test Student,
  if present. Default is to not include Test Student.
- "custom_links": Optionally include plugin-supplied custom links for each student,
  such as analytics information
- "current_grading_period_scores": if enrollments is included as
  well as this directive, the scores returned in the enrollment
  will be for the current grading period if there is one. A
  'grading_period_id' value will also be included with the
  scores. if grading_period_id is nil there is no current grading
  period and the score is a total score.
- "uuid": Optionally include the users uuid
    - user_id (query, optional): If this parameter is given and it corresponds to a user in the course,
      the +page+ parameter will be ignored and the page containing the specified user
      will be returned instead.
    - user_ids (query, optional): If included, the course users set will only include users with IDs
      specified by the param. Note: this will not work in conjunction
      with the "user_id" argument but multiple user_ids can be included.
    - enrollment_state (query, optional): When set, only return users where the enrollment workflow state is of one of
      the given types.
      "active" and "invited" enrollments are returned by default.

- **GET** /v1/courses/{course_id}/recent_students
    - Description: List recently logged in students
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/users/{id}
    - Description: Get single user
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/content_share_users
    - Description: Search for content share users
    - Parameters:
        - course_id (path, required): ID
        - search_term (query, required): Term used to find users. Will search available share users with the search term
          in their name.

- **POST** /v1/courses/{course_id}/preview_html
    - Description: Preview processed html
    - Parameters:
        - course_id (path, required): ID
        - html (form, optional): The html content to process

- **GET** /v1/courses/{course_id}/activity_stream
    - Description: Course activity stream
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/activity_stream/summary
    - Description: Course activity stream summary
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/todo
    - Description: Course TODO items
    - Parameters:
        - course_id (path, required): ID

- **DELETE** /v1/courses/{id}
    - Description: Delete/Conclude a course
    - Parameters:
        - id (path, required): ID
        - event (query, required): The action to take on the course.

- **GET** /v1/courses/{course_id}/settings
    - Description: Get course settings
    - Parameters:
        - course_id (path, required): ID

- **PUT** /v1/courses/{course_id}/settings
    - Description: Update course settings
    - Parameters:
        - course_id (path, required): ID
        - allow_final_grade_override (form, optional): Let student final grades for a grading period or the total grades
          for the course be overridden
        - allow_student_discussion_topics (form, optional): Let students create discussion topics
        - allow_student_forum_attachments (form, optional): Let students attach files to discussions
        - allow_student_discussion_editing (form, optional): Let students edit or delete their own discussion replies
        - allow_student_organized_groups (form, optional): Let students organize their own groups
        - allow_student_discussion_reporting (form, optional): Let students report offensive discussion content
        - allow_student_anonymous_discussion_topics (form, optional): Let students create anonymous discussion topics
        - filter_speed_grader_by_student_group (form, optional): Filter SpeedGrader to only the selected student group
        - hide_final_grades (form, optional): Hide totals in student grades summary
        - hide_distribution_graphs (form, optional): Hide grade distribution graphs from students
        - hide_sections_on_course_users_page (form, optional): Disallow students from viewing students in sections they
          do not belong to
        - lock_all_announcements (form, optional): Disable comments on announcements
        - usage_rights_required (form, optional): Copyright and license information must be provided for files before
          they are published.
        - restrict_student_past_view (form, optional): Restrict students from viewing courses after end date
        - restrict_student_future_view (form, optional): Restrict students from viewing courses before start date
        - show_announcements_on_home_page (form, optional): Show the most recent announcements on the Course home page (
          if a Wiki, defaults to five announcements, configurable via home_page_announcement_limit).
          Canvas for Elementary subjects ignore this setting.
        - home_page_announcement_limit (form, optional): Limit the number of announcements on the home page if enabled
          via show_announcements_on_home_page
        - syllabus_course_summary (form, optional): Show the course summary (list of assignments and calendar events) on
          the syllabus page. Default is true.
        - default_due_time (form, optional): Set the default due time for assignments. This is the time that will be
          pre-selected in the Canvas user interface
          when setting a due date for an assignment. It does not change when any existing assignment is due. It should
          be
          given in 24-hour HH:MM:SS format. The default is "23:59:59". Use "inherit" to inherit the account setting.
        - conditional_release (form, optional): Enable or disable individual learning paths for students based on
          assessment

- **GET** /v1/courses/{course_id}/student_view_student
    - Description: Return test student for course
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{id}
    - Description: Get a single course
    - Parameters:
        - id (path, required): ID
        - include (query, optional): - "all_courses": Also search recently deleted courses.
- "permissions": Include permissions the current user has
  for the course.
- "observed_users": Include observed users in the enrollments
- "course_image": Include course image url if a course image has been set
- "banner_image": Include course banner image url if the course is a Canvas for
  Elementary subject and a banner image has been set
- "concluded": Optional information to include with Course. Indicates whether
  the course has been concluded, taking course and term dates into account.
- "lti_context_id": Include course LTI tool id.
- "post_manually": Include course post policy. If the post policy is manually post grades,
  the value will be true. If the post policy is automatically post grades, the value will be false.
    - teacher_limit (query, optional): The maximum number of teacher enrollments to show.
      If the course contains more teachers than this, instead of giving the teacher
      enrollments, the count of teachers will be given under a _teacher_count_ key.

- **GET** /v1/accounts/{account_id}/courses/{id}
    - Description: Get a single course
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): - "all_courses": Also search recently deleted courses.
- "permissions": Include permissions the current user has
  for the course.
- "observed_users": Include observed users in the enrollments
- "course_image": Include course image url if a course image has been set
- "banner_image": Include course banner image url if the course is a Canvas for
  Elementary subject and a banner image has been set
- "concluded": Optional information to include with Course. Indicates whether
  the course has been concluded, taking course and term dates into account.
- "lti_context_id": Include course LTI tool id.
- "post_manually": Include course post policy. If the post policy is manually post grades,
  the value will be true. If the post policy is automatically post grades, the value will be false.
    - teacher_limit (query, optional): The maximum number of teacher enrollments to show.
      If the course contains more teachers than this, instead of giving the teacher
      enrollments, the count of teachers will be given under a _teacher_count_ key.

- **PUT** /v1/courses/{id}
    - Description: Update a course
    - Parameters:
        - id (path, required): ID
        - course[account_id] (form, optional): The unique ID of the account to move the course to.
        - course[name] (form, optional): The name of the course. If omitted, the course will be named "Unnamed
          Course."
        - course[course_code] (form, optional): The course code for the course.
        - course[start_at] (form, optional): Course start date in ISO8601 format, e.g. 2011-01-01T01:00Z
          This value is ignored unless 'restrict_enrollments_to_course_dates' is set to true,
          or the course is already published.
        - course[end_at] (form, optional): Course end date in ISO8601 format. e.g. 2011-01-01T01:00Z
          This value is ignored unless 'restrict_enrollments_to_course_dates' is set to true.
        - course[license] (form, optional): The name of the licensing. Should be one of the following abbreviations
          (a descriptive name is included in parenthesis for reference):
- 'private' (Private Copyrighted)
- 'cc_by_nc_nd' (CC Attribution Non-Commercial No Derivatives)
- 'cc_by_nc_sa' (CC Attribution Non-Commercial Share Alike)
- 'cc_by_nc' (CC Attribution Non-Commercial)
- 'cc_by_nd' (CC Attribution No Derivatives)
- 'cc_by_sa' (CC Attribution Share Alike)
- 'cc_by' (CC Attribution)
- 'public_domain' (Public Domain).
    - course[is_public] (form, optional): Set to true if course is public to both authenticated and unauthenticated
      users.
    - course[is_public_to_auth_users] (form, optional): Set to true if course is public only to authenticated users.
    - course[public_syllabus] (form, optional): Set to true to make the course syllabus public.
    - course[public_syllabus_to_auth] (form, optional): Set to true to make the course syllabus to public for
      authenticated users.
    - course[public_description] (form, optional): A publicly visible description of the course.
    - course[allow_student_wiki_edits] (form, optional): If true, students will be able to modify the course wiki.
    - course[allow_wiki_comments] (form, optional): If true, course members will be able to comment on wiki pages.
    - course[allow_student_forum_attachments] (form, optional): If true, students can attach files to forum posts.
    - course[open_enrollment] (form, optional): Set to true if the course is open enrollment.
    - course[self_enrollment] (form, optional): Set to true if the course is self enrollment.
    - course[restrict_enrollments_to_course_dates] (form, optional): Set to true to restrict user enrollments to the
      start and end dates of the
      course. Setting this value to false will
      remove the course end date (if it exists), as well as the course start date
      (if the course is unpublished).
    - course[term_id] (form, optional): The unique ID of the term to create to course in.
    - course[sis_course_id] (form, optional): The unique SIS identifier.
    - course[integration_id] (form, optional): The unique Integration identifier.
    - course[hide_final_grades] (form, optional): If this option is set to true, the totals in student grades summary
      will
      be hidden.
    - course[time_zone] (form, optional): The time zone for the course. Allowed time zones are
      {http://www.iana.org/time-zones IANA time zones} or friendlier
      {http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html Ruby on Rails time zones}.
    - course[apply_assignment_group_weights] (form, optional): Set to true to weight final grade based on assignment
      groups percentages.
    - course[storage_quota_mb] (form, optional): Set the storage quota for the course, in megabytes. The caller must
      have
      the "Manage storage quotas" account permission.
    - offer (form, optional): If this option is set to true, the course will be available to students
      immediately.
    - course[event] (form, optional): The action to take on each course.

* 'claim' makes a course no longer visible to students. This action is also called "unpublish" on the web site.
  A course cannot be unpublished if students have received graded submissions.
* 'offer' makes a course visible to students. This action is also called "publish" on the web site.
* 'conclude' prevents future enrollments and makes a course read-only for all participants. The course still appears
  in prior-enrollment lists.
* 'delete' completely removes the course from the web site (including course menus and prior-enrollment lists).
  All enrollments are deleted. Course content may be physically deleted at a future date.
* 'undelete' attempts to recover a course that has been deleted. This action requires account administrative rights.
  (Recovery is not guaranteed; please conclude rather than delete a course if there is any possibility the course
  will be used again.) The recovered course will be unpublished. Deleted enrollments will not be recovered.
    - course[default_view] (form, optional): The type of page that users will see when they first visit the course
* 'feed' Recent Activity Dashboard
* 'wiki' Wiki Front Page
* 'modules' Course Modules/Sections Page
* 'assignments' Course Assignments List
* 'syllabus' Course Syllabus Page
  other types may be added in the future
    - course[syllabus_body] (form, optional): The syllabus body for the course
    - course[syllabus_course_summary] (form, optional): Optional. Indicates whether the Course Summary (consisting of
      the course's assignments and calendar events) is displayed on the syllabus page. Defaults to +true+.
    - course[grading_standard_id] (form, optional): The grading standard id to set for the course. If no value is
      provided for this argument the current grading_standard will be un-set from this course.
    - course[grade_passback_setting] (form, optional): Optional. The grade_passback_setting for the course. Only '
      nightly_sync' and '' are allowed
    - course[course_format] (form, optional): Optional. Specifies the format of the course. (Should be either '
      on_campus' or 'online')
    - course[image_id] (form, optional): This is a file ID corresponding to an image file in the course that will
      be used as the course image.
      This will clear the course's image_url setting if set. If you attempt
      to provide image_url and image_id in a request it will fail.
    - course[image_url] (form, optional): This is a URL to an image to be used as the course image.
      This will clear the course's image_id setting if set. If you attempt
      to provide image_url and image_id in a request it will fail.
    - course[remove_image] (form, optional): If this option is set to true, the course image url and course image
      ID are both set to nil
    - course[remove_banner_image] (form, optional): If this option is set to true, the course banner image url and
      course
      banner image ID are both set to nil
    - course[blueprint] (form, optional): Sets the course as a blueprint course.
    - course[blueprint_restrictions] (form, optional): Sets a default set to apply to blueprint course objects when
      restricted,
      unless _use_blueprint_restrictions_by_object_type_ is enabled.
      See the {api:Blueprint_Courses:BlueprintRestriction Blueprint Restriction} documentation
    - course[use_blueprint_restrictions_by_object_type] (form, optional): When enabled, the _blueprint_restrictions_
      parameter will be ignored in favor of
      the _blueprint_restrictions_by_object_type_ parameter
    - course[blueprint_restrictions_by_object_type] (form, optional): Allows setting multiple {api:Blueprint_Courses:
      BlueprintRestriction Blueprint Restriction}
      to apply to blueprint course objects of the matching type when restricted.
      The possible object types are "assignment", "attachment", "discussion_topic", "quiz" and "wiki_page".
      Example usage:
      course[blueprint_restrictions_by_object_type][assignment][content]=1
    - course[homeroom_course] (form, optional): Sets the course as a homeroom course. The setting takes effect only when
      the course is associated
      with a Canvas for Elementary-enabled account.
    - course[sync_enrollments_from_homeroom] (form, optional): Syncs enrollments from the homeroom that is set in
      homeroom_course_id. The setting only takes effect when the
      course is associated with a Canvas for Elementary-enabled account and sync_enrollments_from_homeroom is enabled.
    - course[homeroom_course_id] (form, optional): Sets the Homeroom Course id to be used with
      sync_enrollments_from_homeroom. The setting only takes effect when the
      course is associated with a Canvas for Elementary-enabled account and sync_enrollments_from_homeroom is enabled.
    - course[template] (form, optional): Enable or disable the course as a template that can be selected by an account
    - course[course_color] (form, optional): Sets a color in hex code format to be associated with the course. The
      setting takes effect only when the course
      is associated with a Canvas for Elementary-enabled account.
    - course[friendly_name] (form, optional): Set a friendly name for the course. If this is provided and the course is
      associated with a Canvas for
      Elementary account, it will be shown instead of the course name. This setting takes priority over
      course nicknames defined by individual users.
    - course[enable_course_paces] (form, optional): Enable or disable Course Pacing for the course. This setting only
      has an effect when the Course Pacing feature flag is
      enabled for the sub-account. Otherwise, Course Pacing are always disabled.
      Note: Course Pacing is in active development.
    - course[conditional_release] (form, optional): Enable or disable individual learning paths for students based on
      assessment
    - course[post_manually] (form, optional): When true, all grades in the course will be posted manually.
      When false, all grades in the course will be automatically posted.
      Use with caution as this setting will override any assignment level post policy.
    - override_sis_stickiness (form, optional): Default is true. If false, any fields containing “sticky” changes will
      not be updated.
      See SIS CSV Format documentation for information on which fields can have SIS stickiness

- **PUT** /v1/accounts/{account_id}/courses
    - Description: Update courses
    - Parameters:
        - account_id (path, required): ID
        - course_ids (form, required): List of ids of courses to update. At most 500 courses may be updated in one call.
        - event (form, required): The action to take on each course. Must be one of 'offer', 'conclude', 'delete', or '
          undelete'.

* 'offer' makes a course visible to students. This action is also called "publish" on the web site.
* 'conclude' prevents future enrollments and makes a course read-only for all participants. The course still appears
  in prior-enrollment lists.
* 'delete' completely removes the course from the web site (including course menus and prior-enrollment lists).
  All enrollments are deleted. Course content may be physically deleted at a future date.
* 'undelete' attempts to recover a course that has been deleted. (Recovery is not guaranteed; please conclude
  rather than delete a course if there is any possibility the course will be used again.) The recovered course
  will be unpublished. Deleted enrollments will not be recovered.

- **POST** /v1/courses/{course_id}/reset_content
    - Description: Reset a course
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/effective_due_dates
    - Description: Get effective due dates
    - Parameters:
        - course_id (path, required): ID
        - assignment_ids (query, optional): no description

- **GET** /v1/courses/{course_id}/permissions
    - Description: Permissions
    - Parameters:
        - course_id (path, required): ID
        - permissions (query, optional): List of permissions to check against the authenticated user.
          Permission names are documented in the {api:RoleOverridesController#add_role Create a role} endpoint.

- **GET** /v1/courses/{course_id}/bulk_user_progress
    - Description: Get bulk user progress
    - Parameters:
        - course_id (path, required): ID

- **POST** /v1/courses/{id}/dismiss_migration_limitation_message
    - Description: Remove quiz migration alert
    - Parameters:
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/course_copy/{id}
    - Description: Get course copy status
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/course_copy
    - Description: Copy course content
    - Parameters:
        - course_id (path, required): ID
        - source_course (form, optional): ID or SIS-ID of the course to copy the content from
        - except (form, optional): A list of the course content types to exclude, all areas not listed will
          be copied.
        - only (form, optional): A list of the course content types to copy, all areas not listed will not
          be copied.

### Custom Gradebook Columns

Path: `/custom_gradebook_columns.json`

- **GET** /v1/courses/{course_id}/custom_gradebook_columns
    - Description: List custom gradebook columns
    - Parameters:
        - course_id (path, required): ID
        - include_hidden (query, optional): Include hidden parameters (defaults to false)

- **POST** /v1/courses/{course_id}/custom_gradebook_columns
    - Description: Create a custom gradebook column
    - Parameters:
        - course_id (path, required): ID
        - column[title] (form, required): no description
        - column[position] (form, optional): The position of the column relative to other custom columns
        - column[hidden] (form, optional): Hidden columns are not displayed in the gradebook
        - column[teacher_notes] (form, optional): Set this if the column is created by a teacher. The gradebook only
          supports one teacher_notes column.
        - column[read_only] (form, optional): Set this to prevent the column from being editable in the gradebook ui

- **PUT** /v1/courses/{course_id}/custom_gradebook_columns/{id}
    - Description: Update a custom gradebook column
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/courses/{course_id}/custom_gradebook_columns/{id}
    - Description: Delete a custom gradebook column
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/custom_gradebook_columns/reorder
    - Description: Reorder custom columns
    - Parameters:
        - course_id (path, required): ID
        - order (form, required): no description

- **GET** /v1/courses/{course_id}/custom_gradebook_columns/{id}/data
    - Description: List entries for a column
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - include_hidden (query, optional): If true, hidden columns will be included in the
          result. If false or absent, only visible columns
          will be returned.

- **PUT** /v1/courses/{course_id}/custom_gradebook_columns/{id}/data/{user_id}
    - Description: Update column data
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - user_id (path, required): ID
        - column_data[content] (form, required): Column content. Setting this to blank will delete the datum object.

- **PUT** /v1/courses/{course_id}/custom_gradebook_column_data
    - Description: Bulk update column data
    - Parameters:
        - course_id (path, required): ID
        - column_data (form, required): Column content. Setting this to an empty string will delete the data object.

### Discussion Topics

Path: `/discussion_topics.json`

- **GET** /v1/courses/{course_id}/discussion_topics
    - Description: List discussion topics
    - Parameters:
        - course_id (path, required): ID
        - include (query, optional): If "all_dates" is passed, all dates associated with graded discussions'
          assignments will be included.
          if "sections" is passed, includes the course sections that are associated
          with the topic, if the topic is specific to certain sections of the course.
          If "sections_user_count" is passed, then:
          (a) If sections were asked for *and* the topic is specific to certain
          course sections, includes the number of users in each
          section. (as part of the section json asked for above)
          (b) Else, includes at the root level the total number of users in the
          topic's context (group or course) that the topic applies to.
          If "overrides" is passed, the overrides for the assignment will be included
        - order_by (query, optional): Determines the order of the discussion topic list. Defaults to "position".
        - scope (query, optional): Only return discussion topics in the given state(s). Defaults to including
          all topics. Filtering is done after pagination, so pages
          may be smaller than requested if topics are filtered.
          Can pass multiple states as comma separated string.
        - only_announcements (query, optional): Return announcements instead of discussion topics. Defaults to false
        - filter_by (query, optional): The state of the discussion topic to return. Currently only supports unread
          state.
        - search_term (query, optional): The partial title of the discussion topics to match and return.
        - exclude_context_module_locked_topics (query, optional): For students, exclude topics that are locked by module
          progression.
          Defaults to false.

- **GET** /v1/groups/{group_id}/discussion_topics
    - Description: List discussion topics
    - Parameters:
        - group_id (path, required): ID
        - include (query, optional): If "all_dates" is passed, all dates associated with graded discussions'
          assignments will be included.
          if "sections" is passed, includes the course sections that are associated
          with the topic, if the topic is specific to certain sections of the course.
          If "sections_user_count" is passed, then:
          (a) If sections were asked for *and* the topic is specific to certain
          course sections, includes the number of users in each
          section. (as part of the section json asked for above)
          (b) Else, includes at the root level the total number of users in the
          topic's context (group or course) that the topic applies to.
          If "overrides" is passed, the overrides for the assignment will be included
        - order_by (query, optional): Determines the order of the discussion topic list. Defaults to "position".
        - scope (query, optional): Only return discussion topics in the given state(s). Defaults to including
          all topics. Filtering is done after pagination, so pages
          may be smaller than requested if topics are filtered.
          Can pass multiple states as comma separated string.
        - only_announcements (query, optional): Return announcements instead of discussion topics. Defaults to false
        - filter_by (query, optional): The state of the discussion topic to return. Currently only supports unread
          state.
        - search_term (query, optional): The partial title of the discussion topics to match and return.
        - exclude_context_module_locked_topics (query, optional): For students, exclude topics that are locked by module
          progression.
          Defaults to false.

- **POST** /v1/courses/{course_id}/discussion_topics
    - Description: Create a new discussion topic
    - Parameters:
        - course_id (path, required): ID
        - title (form, optional): no description
        - message (form, optional): no description
        - discussion_type (form, optional): The type of discussion. Defaults to side_comment or not_threaded if not
          value is given. Accepted values are 'side_comment', 'not_threaded' for discussions that only allow one level
          of nested comments, and 'threaded' for fully threaded discussions.
        - published (form, optional): Whether this topic is published (true) or draft state (false). Only
          teachers and TAs have the ability to create draft state topics.
        - delayed_post_at (form, optional): If a timestamp is given, the topic will not be published until that time.
        - allow_rating (form, optional): Whether or not users can rate entries in this topic.
        - lock_at (form, optional): If a timestamp is given, the topic will be scheduled to lock at the
          provided timestamp. If the timestamp is in the past, the topic will be
          locked.
        - podcast_enabled (form, optional): If true, the topic will have an associated podcast feed.
        - podcast_has_student_posts (form, optional): If true, the podcast will include posts from students as well.
          Implies
          podcast_enabled.
        - require_initial_post (form, optional): If true then a user may not respond to other replies until that user
          has
          made an initial reply. Defaults to false.
        - assignment (form, optional): To create an assignment discussion, pass the assignment parameters as a
          sub-object. See the {api:AssignmentsApiController#create Create an Assignment API}
          for the available parameters. The name parameter will be ignored, as it's
          taken from the discussion title. If you want to make a discussion that was
          an assignment NOT an assignment, pass set_assignment = false as part of
          the assignment object
        - is_announcement (form, optional): If true, this topic is an announcement. It will appear in the
          announcement's section rather than the discussions section. This requires
          announcment-posting permissions.
        - pinned (form, optional): If true, this topic will be listed in the "Pinned Discussion" section
        - position_after (form, optional): By default, discussions are sorted chronologically by creation date, you
          can pass the id of another topic to have this one show up after the other
          when they are listed.
        - group_category_id (form, optional): If present, the topic will become a group discussion assigned
          to the group.
        - only_graders_can_rate (form, optional): If true, only graders will be allowed to rate entries.
        - sort_by_rating (form, optional): If true, entries will be sorted by rating.
        - attachment (form, optional): A multipart/form-data form-field-style attachment.
          Attachments larger than 1 kilobyte are subject to quota restrictions.
        - specific_sections (form, optional): A comma-separated list of sections ids to which the discussion topic
          should be made specific to. If it is not desired to make the discussion
          topic specific to sections, then this parameter may be omitted or set to
          "all". Can only be present only on announcements and only those that are
          for a course (as opposed to a group).

- **POST** /v1/groups/{group_id}/discussion_topics
    - Description: Create a new discussion topic
    - Parameters:
        - group_id (path, required): ID
        - title (form, optional): no description
        - message (form, optional): no description
        - discussion_type (form, optional): The type of discussion. Defaults to side_comment or not_threaded if not
          value is given. Accepted values are 'side_comment', 'not_threaded' for discussions that only allow one level
          of nested comments, and 'threaded' for fully threaded discussions.
        - published (form, optional): Whether this topic is published (true) or draft state (false). Only
          teachers and TAs have the ability to create draft state topics.
        - delayed_post_at (form, optional): If a timestamp is given, the topic will not be published until that time.
        - allow_rating (form, optional): Whether or not users can rate entries in this topic.
        - lock_at (form, optional): If a timestamp is given, the topic will be scheduled to lock at the
          provided timestamp. If the timestamp is in the past, the topic will be
          locked.
        - podcast_enabled (form, optional): If true, the topic will have an associated podcast feed.
        - podcast_has_student_posts (form, optional): If true, the podcast will include posts from students as well.
          Implies
          podcast_enabled.
        - require_initial_post (form, optional): If true then a user may not respond to other replies until that user
          has
          made an initial reply. Defaults to false.
        - assignment (form, optional): To create an assignment discussion, pass the assignment parameters as a
          sub-object. See the {api:AssignmentsApiController#create Create an Assignment API}
          for the available parameters. The name parameter will be ignored, as it's
          taken from the discussion title. If you want to make a discussion that was
          an assignment NOT an assignment, pass set_assignment = false as part of
          the assignment object
        - is_announcement (form, optional): If true, this topic is an announcement. It will appear in the
          announcement's section rather than the discussions section. This requires
          announcment-posting permissions.
        - pinned (form, optional): If true, this topic will be listed in the "Pinned Discussion" section
        - position_after (form, optional): By default, discussions are sorted chronologically by creation date, you
          can pass the id of another topic to have this one show up after the other
          when they are listed.
        - group_category_id (form, optional): If present, the topic will become a group discussion assigned
          to the group.
        - only_graders_can_rate (form, optional): If true, only graders will be allowed to rate entries.
        - sort_by_rating (form, optional): If true, entries will be sorted by rating.
        - attachment (form, optional): A multipart/form-data form-field-style attachment.
          Attachments larger than 1 kilobyte are subject to quota restrictions.
        - specific_sections (form, optional): A comma-separated list of sections ids to which the discussion topic
          should be made specific to. If it is not desired to make the discussion
          topic specific to sections, then this parameter may be omitted or set to
          "all". Can only be present only on announcements and only those that are
          for a course (as opposed to a group).

- **PUT** /v1/courses/{course_id}/discussion_topics/{topic_id}
    - Description: Update a topic
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - title (form, optional): no description
        - message (form, optional): no description
        - discussion_type (form, optional): The type of discussion. Defaults to side_comment or not_threaded if not
          value is given. Accepted values are 'side_comment', 'not_threaded' for discussions that only allow one level
          of nested comments, and 'threaded' for fully threaded discussions.
        - published (form, optional): Whether this topic is published (true) or draft state (false). Only
          teachers and TAs have the ability to create draft state topics.
        - delayed_post_at (form, optional): If a timestamp is given, the topic will not be published until that time.
        - lock_at (form, optional): If a timestamp is given, the topic will be scheduled to lock at the
          provided timestamp. If the timestamp is in the past, the topic will be
          locked.
        - podcast_enabled (form, optional): If true, the topic will have an associated podcast feed.
        - podcast_has_student_posts (form, optional): If true, the podcast will include posts from students as well.
          Implies
          podcast_enabled.
        - require_initial_post (form, optional): If true then a user may not respond to other replies until that user
          has
          made an initial reply. Defaults to false.
        - assignment (form, optional): To create an assignment discussion, pass the assignment parameters as a
          sub-object. See the {api:AssignmentsApiController#create Create an Assignment API}
          for the available parameters. The name parameter will be ignored, as it's
          taken from the discussion title. If you want to make a discussion that was
          an assignment NOT an assignment, pass set_assignment = false as part of
          the assignment object
        - is_announcement (form, optional): If true, this topic is an announcement. It will appear in the
          announcement's section rather than the discussions section. This requires
          announcment-posting permissions.
        - pinned (form, optional): If true, this topic will be listed in the "Pinned Discussion" section
        - position_after (form, optional): By default, discussions are sorted chronologically by creation date, you
          can pass the id of another topic to have this one show up after the other
          when they are listed.
        - group_category_id (form, optional): If present, the topic will become a group discussion assigned
          to the group.
        - allow_rating (form, optional): If true, users will be allowed to rate entries.
        - only_graders_can_rate (form, optional): If true, only graders will be allowed to rate entries.
        - sort_by_rating (form, optional): If true, entries will be sorted by rating.
        - specific_sections (form, optional): A comma-separated list of sections ids to which the discussion topic
          should be made specific too. If it is not desired to make the discussion
          topic specific to sections, then this parameter may be omitted or set to
          "all". Can only be present only on announcements and only those that are
          for a course (as opposed to a group).

- **PUT** /v1/groups/{group_id}/discussion_topics/{topic_id}
    - Description: Update a topic
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - title (form, optional): no description
        - message (form, optional): no description
        - discussion_type (form, optional): The type of discussion. Defaults to side_comment or not_threaded if not
          value is given. Accepted values are 'side_comment', 'not_threaded' for discussions that only allow one level
          of nested comments, and 'threaded' for fully threaded discussions.
        - published (form, optional): Whether this topic is published (true) or draft state (false). Only
          teachers and TAs have the ability to create draft state topics.
        - delayed_post_at (form, optional): If a timestamp is given, the topic will not be published until that time.
        - lock_at (form, optional): If a timestamp is given, the topic will be scheduled to lock at the
          provided timestamp. If the timestamp is in the past, the topic will be
          locked.
        - podcast_enabled (form, optional): If true, the topic will have an associated podcast feed.
        - podcast_has_student_posts (form, optional): If true, the podcast will include posts from students as well.
          Implies
          podcast_enabled.
        - require_initial_post (form, optional): If true then a user may not respond to other replies until that user
          has
          made an initial reply. Defaults to false.
        - assignment (form, optional): To create an assignment discussion, pass the assignment parameters as a
          sub-object. See the {api:AssignmentsApiController#create Create an Assignment API}
          for the available parameters. The name parameter will be ignored, as it's
          taken from the discussion title. If you want to make a discussion that was
          an assignment NOT an assignment, pass set_assignment = false as part of
          the assignment object
        - is_announcement (form, optional): If true, this topic is an announcement. It will appear in the
          announcement's section rather than the discussions section. This requires
          announcment-posting permissions.
        - pinned (form, optional): If true, this topic will be listed in the "Pinned Discussion" section
        - position_after (form, optional): By default, discussions are sorted chronologically by creation date, you
          can pass the id of another topic to have this one show up after the other
          when they are listed.
        - group_category_id (form, optional): If present, the topic will become a group discussion assigned
          to the group.
        - allow_rating (form, optional): If true, users will be allowed to rate entries.
        - only_graders_can_rate (form, optional): If true, only graders will be allowed to rate entries.
        - sort_by_rating (form, optional): If true, entries will be sorted by rating.
        - specific_sections (form, optional): A comma-separated list of sections ids to which the discussion topic
          should be made specific too. If it is not desired to make the discussion
          topic specific to sections, then this parameter may be omitted or set to
          "all". Can only be present only on announcements and only those that are
          for a course (as opposed to a group).

- **DELETE** /v1/courses/{course_id}/discussion_topics/{topic_id}
    - Description: Delete a topic
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID

- **DELETE** /v1/groups/{group_id}/discussion_topics/{topic_id}
    - Description: Delete a topic
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID

- **POST** /v1/courses/{course_id}/discussion_topics/reorder
    - Description: Reorder pinned topics
    - Parameters:
        - course_id (path, required): ID
        - order (form, required): The ids of the pinned discussion topics in the desired order.
          (For example, "order=104,102,103".)

- **POST** /v1/groups/{group_id}/discussion_topics/reorder
    - Description: Reorder pinned topics
    - Parameters:
        - group_id (path, required): ID
        - order (form, required): The ids of the pinned discussion topics in the desired order.
          (For example, "order=104,102,103".)

- **PUT** /v1/courses/{course_id}/discussion_topics/{topic_id}/entries/{id}
    - Description: Update an entry
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - id (path, required): ID
        - message (form, optional): The updated body of the entry.

- **PUT** /v1/groups/{group_id}/discussion_topics/{topic_id}/entries/{id}
    - Description: Update an entry
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - id (path, required): ID
        - message (form, optional): The updated body of the entry.

- **DELETE** /v1/courses/{course_id}/discussion_topics/{topic_id}/entries/{id}
    - Description: Delete an entry
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/groups/{group_id}/discussion_topics/{topic_id}/entries/{id}
    - Description: Delete an entry
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/discussion_topics/{topic_id}
    - Description: Get a single topic
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - include (query, optional): If "all_dates" is passed, all dates associated with graded discussions'
          assignments will be included.
          if "sections" is passed, includes the course sections that are associated
          with the topic, if the topic is specific to certain sections of the course.
          If "sections_user_count" is passed, then:
          (a) If sections were asked for *and* the topic is specific to certain
          course sections, includes the number of users in each
          section. (as part of the section json asked for above)
          (b) Else, includes at the root level the total number of users in the
          topic's context (group or course) that the topic applies to.
          If "overrides" is passed, the overrides for the assignment will be included

- **GET** /v1/groups/{group_id}/discussion_topics/{topic_id}
    - Description: Get a single topic
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - include (query, optional): If "all_dates" is passed, all dates associated with graded discussions'
          assignments will be included.
          if "sections" is passed, includes the course sections that are associated
          with the topic, if the topic is specific to certain sections of the course.
          If "sections_user_count" is passed, then:
          (a) If sections were asked for *and* the topic is specific to certain
          course sections, includes the number of users in each
          section. (as part of the section json asked for above)
          (b) Else, includes at the root level the total number of users in the
          topic's context (group or course) that the topic applies to.
          If "overrides" is passed, the overrides for the assignment will be included

- **GET** /v1/courses/{course_id}/discussion_topics/{topic_id}/summaries
    - Description: Summary
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - userInput (query, optional): Areas or topics for the summary to focus on.

- **GET** /v1/groups/{group_id}/discussion_topics/{topic_id}/summaries
    - Description: Summary
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - userInput (query, optional): Areas or topics for the summary to focus on.

- **PUT** /v1/courses/{course_id}/discussion_topics/{topic_id}/summaries/disable
    - Description: Disable summary
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID

- **PUT** /v1/groups/{group_id}/discussion_topics/{topic_id}/summaries/disable
    - Description: Disable summary
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID

- **POST** /v1/courses/{course_id}/discussion_topics/{topic_id}/summaries/{summary_id}/feedback
    - Description: Summary Feedback
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - summary_id (path, required): ID
        - _action (form, optional): Required
          The action to take on the summary. Possible values are:
- "seen": Marks the summary as seen. This action saves the feedback if it's not already persisted.
- "like": Marks the summary as liked.
- "dislike": Marks the summary as disliked.
- "reset_like": Resets the like status of the summary.
- "regenerate": Regenerates the summary feedback.
- "disable_summary": Disables the summary feedback.
  Any other value will result in an error response.

- **POST** /v1/groups/{group_id}/discussion_topics/{topic_id}/summaries/{summary_id}/feedback
    - Description: Summary Feedback
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - summary_id (path, required): ID
        - _action (form, optional): Required
          The action to take on the summary. Possible values are:
- "seen": Marks the summary as seen. This action saves the feedback if it's not already persisted.
- "like": Marks the summary as liked.
- "dislike": Marks the summary as disliked.
- "reset_like": Resets the like status of the summary.
- "regenerate": Regenerates the summary feedback.
- "disable_summary": Disables the summary feedback.
  Any other value will result in an error response.

- **GET** /v1/courses/{course_id}/discussion_topics/{topic_id}/view
    - Description: Get the full topic
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID

- **GET** /v1/groups/{group_id}/discussion_topics/{topic_id}/view
    - Description: Get the full topic
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID

- **POST** /v1/courses/{course_id}/discussion_topics/{topic_id}/entries
    - Description: Post an entry
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - message (form, optional): The body of the entry.
        - attachment (form, optional): a multipart/form-data form-field-style
          attachment. Attachments larger than 1 kilobyte are subject to quota
          restrictions.

- **POST** /v1/groups/{group_id}/discussion_topics/{topic_id}/entries
    - Description: Post an entry
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - message (form, optional): The body of the entry.
        - attachment (form, optional): a multipart/form-data form-field-style
          attachment. Attachments larger than 1 kilobyte are subject to quota
          restrictions.

- **POST** /v1/courses/{course_id}/discussion_topics/{topic_id}/duplicate
    - Description: Duplicate discussion topic
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID

- **POST** /v1/groups/{group_id}/discussion_topics/{topic_id}/duplicate
    - Description: Duplicate discussion topic
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID

- **GET** /v1/courses/{course_id}/discussion_topics/{topic_id}/entries
    - Description: List topic entries
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID

- **GET** /v1/groups/{group_id}/discussion_topics/{topic_id}/entries
    - Description: List topic entries
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID

- **POST** /v1/courses/{course_id}/discussion_topics/{topic_id}/entries/{entry_id}/replies
    - Description: Post a reply
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - entry_id (path, required): ID
        - message (form, optional): The body of the entry.
        - attachment (form, optional): a multipart/form-data form-field-style
          attachment. Attachments larger than 1 kilobyte are subject to quota
          restrictions.

- **POST** /v1/groups/{group_id}/discussion_topics/{topic_id}/entries/{entry_id}/replies
    - Description: Post a reply
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - entry_id (path, required): ID
        - message (form, optional): The body of the entry.
        - attachment (form, optional): a multipart/form-data form-field-style
          attachment. Attachments larger than 1 kilobyte are subject to quota
          restrictions.

- **GET** /v1/courses/{course_id}/discussion_topics/{topic_id}/entries/{entry_id}/replies
    - Description: List entry replies
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - entry_id (path, required): ID

- **GET** /v1/groups/{group_id}/discussion_topics/{topic_id}/entries/{entry_id}/replies
    - Description: List entry replies
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - entry_id (path, required): ID

- **GET** /v1/courses/{course_id}/discussion_topics/{topic_id}/entry_list
    - Description: List entries
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - ids (query, optional): A list of entry ids to retrieve. Entries will be returned in id order,
          smallest id first.

- **GET** /v1/groups/{group_id}/discussion_topics/{topic_id}/entry_list
    - Description: List entries
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - ids (query, optional): A list of entry ids to retrieve. Entries will be returned in id order,
          smallest id first.

- **PUT** /v1/courses/{course_id}/discussion_topics/{topic_id}/read
    - Description: Mark topic as read
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID

- **PUT** /v1/groups/{group_id}/discussion_topics/{topic_id}/read
    - Description: Mark topic as read
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID

- **PUT** /v1/courses/{course_id}/discussion_topics/read_all
    - Description: Mark all topic as read
    - Parameters:
        - course_id (path, required): ID

- **PUT** /v1/groups/{group_id}/discussion_topics/read_all
    - Description: Mark all topic as read
    - Parameters:
        - group_id (path, required): ID

- **DELETE** /v1/courses/{course_id}/discussion_topics/{topic_id}/read
    - Description: Mark topic as unread
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID

- **DELETE** /v1/groups/{group_id}/discussion_topics/{topic_id}/read
    - Description: Mark topic as unread
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID

- **PUT** /v1/courses/{course_id}/discussion_topics/{topic_id}/read_all
    - Description: Mark all entries as read
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - forced_read_state (form, optional): A boolean value to set all of the entries' forced_read_state. No change
          is made if this argument is not specified.

- **PUT** /v1/groups/{group_id}/discussion_topics/{topic_id}/read_all
    - Description: Mark all entries as read
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - forced_read_state (form, optional): A boolean value to set all of the entries' forced_read_state. No change
          is made if this argument is not specified.

- **DELETE** /v1/courses/{course_id}/discussion_topics/{topic_id}/read_all
    - Description: Mark all entries as unread
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - forced_read_state (query, optional): A boolean value to set all of the entries' forced_read_state. No change
          is
          made if this argument is not specified.

- **DELETE** /v1/groups/{group_id}/discussion_topics/{topic_id}/read_all
    - Description: Mark all entries as unread
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - forced_read_state (query, optional): A boolean value to set all of the entries' forced_read_state. No change
          is
          made if this argument is not specified.

- **PUT** /v1/courses/{course_id}/discussion_topics/{topic_id}/entries/{entry_id}/read
    - Description: Mark entry as read
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - entry_id (path, required): ID
        - forced_read_state (form, optional): A boolean value to set the entry's forced_read_state. No change is made if
          this argument is not specified.

- **PUT** /v1/groups/{group_id}/discussion_topics/{topic_id}/entries/{entry_id}/read
    - Description: Mark entry as read
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - entry_id (path, required): ID
        - forced_read_state (form, optional): A boolean value to set the entry's forced_read_state. No change is made if
          this argument is not specified.

- **DELETE** /v1/courses/{course_id}/discussion_topics/{topic_id}/entries/{entry_id}/read
    - Description: Mark entry as unread
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - entry_id (path, required): ID
        - forced_read_state (query, optional): A boolean value to set the entry's forced_read_state. No change is made
          if
          this argument is not specified.

- **DELETE** /v1/groups/{group_id}/discussion_topics/{topic_id}/entries/{entry_id}/read
    - Description: Mark entry as unread
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - entry_id (path, required): ID
        - forced_read_state (query, optional): A boolean value to set the entry's forced_read_state. No change is made
          if
          this argument is not specified.

- **POST** /v1/courses/{course_id}/discussion_topics/{topic_id}/entries/{entry_id}/rating
    - Description: Rate entry
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID
        - entry_id (path, required): ID
        - rating (form, optional): A rating to set on this entry. Only 0 and 1 are accepted.

- **POST** /v1/groups/{group_id}/discussion_topics/{topic_id}/entries/{entry_id}/rating
    - Description: Rate entry
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID
        - entry_id (path, required): ID
        - rating (form, optional): A rating to set on this entry. Only 0 and 1 are accepted.

- **PUT** /v1/courses/{course_id}/discussion_topics/{topic_id}/subscribed
    - Description: Subscribe to a topic
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID

- **PUT** /v1/groups/{group_id}/discussion_topics/{topic_id}/subscribed
    - Description: Subscribe to a topic
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID

- **DELETE** /v1/courses/{course_id}/discussion_topics/{topic_id}/subscribed
    - Description: Unsubscribe from a topic
    - Parameters:
        - course_id (path, required): ID
        - topic_id (path, required): ID

- **DELETE** /v1/groups/{group_id}/discussion_topics/{topic_id}/subscribed
    - Description: Unsubscribe from a topic
    - Parameters:
        - group_id (path, required): ID
        - topic_id (path, required): ID

### Enrollment Terms

Path: `/enrollment_terms.json`

- **POST** /v1/accounts/{account_id}/terms
    - Description: Create enrollment term
    - Parameters:
        - account_id (path, required): ID
        - enrollment_term[name] (form, optional): The name of the term.
        - enrollment_term[start_at] (form, optional): The day/time the term starts.
          Accepts times in ISO 8601 format, e.g. 2015-01-10T18:48:00Z.
        - enrollment_term[end_at] (form, optional): The day/time the term ends.
          Accepts times in ISO 8601 format, e.g. 2015-01-10T18:48:00Z.
        - enrollment_term[sis_term_id] (form, optional): The unique SIS identifier for the term.
        - enrollment_term[overrides][enrollment_type][start_at] (form, optional): The day/time the term starts,
          overridden for the given enrollment type.
          *enrollment_type* can be one of StudentEnrollment, TeacherEnrollment, TaEnrollment, or DesignerEnrollment
        - enrollment_term[overrides][enrollment_type][end_at] (form, optional): The day/time the term ends, overridden
          for the given enrollment type.
          *enrollment_type* can be one of StudentEnrollment, TeacherEnrollment, TaEnrollment, or DesignerEnrollment

- **PUT** /v1/accounts/{account_id}/terms/{id}
    - Description: Update enrollment term
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - enrollment_term[name] (form, optional): The name of the term.
        - enrollment_term[start_at] (form, optional): The day/time the term starts.
          Accepts times in ISO 8601 format, e.g. 2015-01-10T18:48:00Z.
        - enrollment_term[end_at] (form, optional): The day/time the term ends.
          Accepts times in ISO 8601 format, e.g. 2015-01-10T18:48:00Z.
        - enrollment_term[sis_term_id] (form, optional): The unique SIS identifier for the term.
        - enrollment_term[overrides][enrollment_type][start_at] (form, optional): The day/time the term starts,
          overridden for the given enrollment type.
          *enrollment_type* can be one of StudentEnrollment, TeacherEnrollment, TaEnrollment, or DesignerEnrollment
        - enrollment_term[overrides][enrollment_type][end_at] (form, optional): The day/time the term ends, overridden
          for the given enrollment type.
          *enrollment_type* can be one of StudentEnrollment, TeacherEnrollment, TaEnrollment, or DesignerEnrollment
        - override_sis_stickiness (form, optional): Default is true. If false, any fields containing “sticky” changes
          will not be updated.
          See SIS CSV Format documentation for information on which fields can have SIS stickiness

- **DELETE** /v1/accounts/{account_id}/terms/{id}
    - Description: Delete enrollment term
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/terms
    - Description: List enrollment terms
    - Parameters:
        - account_id (path, required): ID
        - workflow_state (query, optional): If set, only returns terms that are in the given state.
          Defaults to 'active'.
        - include (query, optional): Array of additional information to include.

"overrides":: term start/end dates overridden for different enrollment types
"course_count":: the number of courses in each term
- term_name (query, optional): If set, only returns terms that match the given search keyword.
Search keyword is matched against term name.

- **GET** /v1/accounts/{account_id}/terms/{id}
    - Description: Retrieve enrollment term
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

### Enrollments

Path: `/enrollments.json`

- **GET** /v1/courses/{course_id}/enrollments
    - Description: List enrollments
    - Parameters:
        - course_id (path, required): ID
        - type (query, optional): A list of enrollment types to return. Accepted values are
          'StudentEnrollment', 'TeacherEnrollment', 'TaEnrollment',
          'DesignerEnrollment', and 'ObserverEnrollment.' If omitted, all enrollment
          types are returned. This argument is ignored if `role` is given.
        - role (query, optional): A list of enrollment roles to return. Accepted values include course-level
          roles created by the {api:RoleOverridesController#add_role Add Role API}
          as well as the base enrollment types accepted by the `type` argument above.
        - state (query, optional): Filter by enrollment state. If omitted, 'active' and 'invited' enrollments
          are returned. The following synthetic states are supported only when
          querying a user's enrollments (either via user_id argument or via user
          enrollments endpoint): +current_and_invited+, +current_and_future+, +current_future_and_restricted+,
          +current_and_concluded+
        - include (query, optional): Array of additional information to include on the enrollment or user records.
          "avatar_url" and "group_ids" will be returned on the user record. If "current_points"
          is specified, the fields "current_points" and (if the caller has
          permissions to manage grades) "unposted_current_points" will be included
          in the "grades" hash for student enrollments.
        - user_id (query, optional): Filter by user_id (only valid for course or section enrollment
          queries). If set to the current user's id, this is a way to
          determine if the user has any enrollments in the course or section,
          independent of whether the user has permission to view other people
          on the roster.
        - grading_period_id (query, optional): Return grades for the given grading_period. If this parameter is not
          specified, the returned grades will be for the whole course.
        - enrollment_term_id (query, optional): Returns only enrollments for the specified enrollment term. This
          parameter
          only applies to the user enrollments path. May pass the ID from the
          enrollment terms api or the SIS id prepended with 'sis_term_id:'.
        - sis_account_id (query, optional): Returns only enrollments for the specified SIS account ID(s). Does not
          look into sub_accounts. May pass in array or string.
        - sis_course_id (query, optional): Returns only enrollments matching the specified SIS course ID(s).
          May pass in array or string.
        - sis_section_id (query, optional): Returns only section enrollments matching the specified SIS section ID(s).
          May pass in array or string.
        - sis_user_id (query, optional): Returns only enrollments for the specified SIS user ID(s). May pass in
          array or string.
        - created_for_sis_id (query, optional): If sis_user_id is present and created_for_sis_id is true, Returns only
          enrollments for the specified SIS ID(s).
          If a user has two sis_id's, one enrollment may be created using one of the
          two ids. This would limit the enrollments returned from the endpoint to
          enrollments that were created from a sis_import with that sis_user_id

- **GET** /v1/sections/{section_id}/enrollments
    - Description: List enrollments
    - Parameters:
        - section_id (path, required): ID
        - type (query, optional): A list of enrollment types to return. Accepted values are
          'StudentEnrollment', 'TeacherEnrollment', 'TaEnrollment',
          'DesignerEnrollment', and 'ObserverEnrollment.' If omitted, all enrollment
          types are returned. This argument is ignored if `role` is given.
        - role (query, optional): A list of enrollment roles to return. Accepted values include course-level
          roles created by the {api:RoleOverridesController#add_role Add Role API}
          as well as the base enrollment types accepted by the `type` argument above.
        - state (query, optional): Filter by enrollment state. If omitted, 'active' and 'invited' enrollments
          are returned. The following synthetic states are supported only when
          querying a user's enrollments (either via user_id argument or via user
          enrollments endpoint): +current_and_invited+, +current_and_future+, +current_future_and_restricted+,
          +current_and_concluded+
        - include (query, optional): Array of additional information to include on the enrollment or user records.
          "avatar_url" and "group_ids" will be returned on the user record. If "current_points"
          is specified, the fields "current_points" and (if the caller has
          permissions to manage grades) "unposted_current_points" will be included
          in the "grades" hash for student enrollments.
        - user_id (query, optional): Filter by user_id (only valid for course or section enrollment
          queries). If set to the current user's id, this is a way to
          determine if the user has any enrollments in the course or section,
          independent of whether the user has permission to view other people
          on the roster.
        - grading_period_id (query, optional): Return grades for the given grading_period. If this parameter is not
          specified, the returned grades will be for the whole course.
        - enrollment_term_id (query, optional): Returns only enrollments for the specified enrollment term. This
          parameter
          only applies to the user enrollments path. May pass the ID from the
          enrollment terms api or the SIS id prepended with 'sis_term_id:'.
        - sis_account_id (query, optional): Returns only enrollments for the specified SIS account ID(s). Does not
          look into sub_accounts. May pass in array or string.
        - sis_course_id (query, optional): Returns only enrollments matching the specified SIS course ID(s).
          May pass in array or string.
        - sis_section_id (query, optional): Returns only section enrollments matching the specified SIS section ID(s).
          May pass in array or string.
        - sis_user_id (query, optional): Returns only enrollments for the specified SIS user ID(s). May pass in
          array or string.
        - created_for_sis_id (query, optional): If sis_user_id is present and created_for_sis_id is true, Returns only
          enrollments for the specified SIS ID(s).
          If a user has two sis_id's, one enrollment may be created using one of the
          two ids. This would limit the enrollments returned from the endpoint to
          enrollments that were created from a sis_import with that sis_user_id

- **GET** /v1/users/{user_id}/enrollments
    - Description: List enrollments
    - Parameters:
        - type (query, optional): A list of enrollment types to return. Accepted values are
          'StudentEnrollment', 'TeacherEnrollment', 'TaEnrollment',
          'DesignerEnrollment', and 'ObserverEnrollment.' If omitted, all enrollment
          types are returned. This argument is ignored if `role` is given.
        - role (query, optional): A list of enrollment roles to return. Accepted values include course-level
          roles created by the {api:RoleOverridesController#add_role Add Role API}
          as well as the base enrollment types accepted by the `type` argument above.
        - state (query, optional): Filter by enrollment state. If omitted, 'active' and 'invited' enrollments
          are returned. The following synthetic states are supported only when
          querying a user's enrollments (either via user_id argument or via user
          enrollments endpoint): +current_and_invited+, +current_and_future+, +current_future_and_restricted+,
          +current_and_concluded+
        - include (query, optional): Array of additional information to include on the enrollment or user records.
          "avatar_url" and "group_ids" will be returned on the user record. If "current_points"
          is specified, the fields "current_points" and (if the caller has
          permissions to manage grades) "unposted_current_points" will be included
          in the "grades" hash for student enrollments.
        - user_id (path, required): Filter by user_id (only valid for course or section enrollment
          queries). If set to the current user's id, this is a way to
          determine if the user has any enrollments in the course or section,
          independent of whether the user has permission to view other people
          on the roster.
        - grading_period_id (query, optional): Return grades for the given grading_period. If this parameter is not
          specified, the returned grades will be for the whole course.
        - enrollment_term_id (query, optional): Returns only enrollments for the specified enrollment term. This
          parameter
          only applies to the user enrollments path. May pass the ID from the
          enrollment terms api or the SIS id prepended with 'sis_term_id:'.
        - sis_account_id (query, optional): Returns only enrollments for the specified SIS account ID(s). Does not
          look into sub_accounts. May pass in array or string.
        - sis_course_id (query, optional): Returns only enrollments matching the specified SIS course ID(s).
          May pass in array or string.
        - sis_section_id (query, optional): Returns only section enrollments matching the specified SIS section ID(s).
          May pass in array or string.
        - sis_user_id (query, optional): Returns only enrollments for the specified SIS user ID(s). May pass in
          array or string.
        - created_for_sis_id (query, optional): If sis_user_id is present and created_for_sis_id is true, Returns only
          enrollments for the specified SIS ID(s).
          If a user has two sis_id's, one enrollment may be created using one of the
          two ids. This would limit the enrollments returned from the endpoint to
          enrollments that were created from a sis_import with that sis_user_id

- **GET** /v1/accounts/{account_id}/enrollments/{id}
    - Description: Enrollment by ID
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): The ID of the enrollment object

- **POST** /v1/courses/{course_id}/enrollments
    - Description: Enroll a user
    - Parameters:
        - course_id (path, required): ID
        - enrollment[start_at] (form, optional): The start time of the enrollment, in ISO8601 format. e.g.
          2012-04-18T23:08:51Z
        - enrollment[end_at] (form, optional): The end time of the enrollment, in ISO8601 format. e.g. 2012-04-18T23:08:
          51Z
        - enrollment[user_id] (form, required): The ID of the user to be enrolled in the course.
        - enrollment[type] (form, required): Enroll the user as a student, teacher, TA, observer, or designer. If no
          value is given, the type will be inferred by enrollment[role] if supplied,
          otherwise 'StudentEnrollment' will be used.
        - enrollment[role] (form, optional): Assigns a custom course-level role to the user.
        - enrollment[role_id] (form, optional): Assigns a custom course-level role to the user.
        - enrollment[enrollment_state] (form, optional): If set to 'active,' student will be immediately enrolled in the
          course.
          Otherwise they will be required to accept a course invitation. Default is
          'invited.'.

If set to 'inactive', student will be listed in the course roster for
teachers, but will not be able to participate in the course until
their enrollment is activated.
- enrollment[course_section_id] (form, optional): The ID of the course section to enroll the student in. If the
section-specific URL is used, this argument is redundant and will be
ignored.
- enrollment[limit_privileges_to_course_section] (form, optional): If set, the enrollment will only allow the user to
see and interact with
users enrolled in the section given by course_section_id.

* For teachers and TAs, this includes grading privileges.
* Section-limited students will not see any users (including teachers
  and TAs) not enrolled in their sections.
* Users may have other enrollments that grant privileges to
  multiple sections in the same course.
    - enrollment[notify] (form, optional): If true, a notification will be sent to the enrolled user.
      Notifications are not sent by default.
    - enrollment[self_enrollment_code] (form, optional): If the current user is not allowed to manage enrollments in
      this
      course, but the course allows self-enrollment, the user can self-
      enroll as a student in the default section by passing in a valid
      code. When self-enrolling, the user_id must be 'self'. The
      enrollment_state will be set to 'active' and all other arguments
      will be ignored.
    - enrollment[self_enrolled] (form, optional): If true, marks the enrollment as a self-enrollment, which gives
      students the ability to drop the course if desired. Defaults to false.
    - enrollment[associated_user_id] (form, optional): For an observer enrollment, the ID of a student to observe.
      This is a one-off operation; to automatically observe all a
      student's enrollments (for example, as a parent), please use
      the {api:UserObserveesController#create User Observees API}.
    - enrollment[sis_user_id] (form, optional): Required if the user is being enrolled from another trusted account.
      The unique identifier for the user (sis_user_id) must also be
      accompanied by the root_account parameter. The user_id will be ignored.
    - enrollment[integration_id] (form, optional): Required if the user is being enrolled from another trusted account.
      The unique identifier for the user (integration_id) must also be
      accompanied by the root_account parameter. The user_id will be ignored.
    - root_account (form, optional): The domain of the account to search for the user. Will be a no-op
      unless the sis_user_id or integration_id parameter is also included.

- **POST** /v1/sections/{section_id}/enrollments
    - Description: Enroll a user
    - Parameters:
        - section_id (path, required): ID
        - enrollment[start_at] (form, optional): The start time of the enrollment, in ISO8601 format. e.g.
          2012-04-18T23:08:51Z
        - enrollment[end_at] (form, optional): The end time of the enrollment, in ISO8601 format. e.g. 2012-04-18T23:08:
          51Z
        - enrollment[user_id] (form, required): The ID of the user to be enrolled in the course.
        - enrollment[type] (form, required): Enroll the user as a student, teacher, TA, observer, or designer. If no
          value is given, the type will be inferred by enrollment[role] if supplied,
          otherwise 'StudentEnrollment' will be used.
        - enrollment[role] (form, optional): Assigns a custom course-level role to the user.
        - enrollment[role_id] (form, optional): Assigns a custom course-level role to the user.
        - enrollment[enrollment_state] (form, optional): If set to 'active,' student will be immediately enrolled in the
          course.
          Otherwise they will be required to accept a course invitation. Default is
          'invited.'.

If set to 'inactive', student will be listed in the course roster for
teachers, but will not be able to participate in the course until
their enrollment is activated.
- enrollment[course_section_id] (form, optional): The ID of the course section to enroll the student in. If the
section-specific URL is used, this argument is redundant and will be
ignored.
- enrollment[limit_privileges_to_course_section] (form, optional): If set, the enrollment will only allow the user to
see and interact with
users enrolled in the section given by course_section_id.

* For teachers and TAs, this includes grading privileges.
* Section-limited students will not see any users (including teachers
  and TAs) not enrolled in their sections.
* Users may have other enrollments that grant privileges to
  multiple sections in the same course.
    - enrollment[notify] (form, optional): If true, a notification will be sent to the enrolled user.
      Notifications are not sent by default.
    - enrollment[self_enrollment_code] (form, optional): If the current user is not allowed to manage enrollments in
      this
      course, but the course allows self-enrollment, the user can self-
      enroll as a student in the default section by passing in a valid
      code. When self-enrolling, the user_id must be 'self'. The
      enrollment_state will be set to 'active' and all other arguments
      will be ignored.
    - enrollment[self_enrolled] (form, optional): If true, marks the enrollment as a self-enrollment, which gives
      students the ability to drop the course if desired. Defaults to false.
    - enrollment[associated_user_id] (form, optional): For an observer enrollment, the ID of a student to observe.
      This is a one-off operation; to automatically observe all a
      student's enrollments (for example, as a parent), please use
      the {api:UserObserveesController#create User Observees API}.
    - enrollment[sis_user_id] (form, optional): Required if the user is being enrolled from another trusted account.
      The unique identifier for the user (sis_user_id) must also be
      accompanied by the root_account parameter. The user_id will be ignored.
    - enrollment[integration_id] (form, optional): Required if the user is being enrolled from another trusted account.
      The unique identifier for the user (integration_id) must also be
      accompanied by the root_account parameter. The user_id will be ignored.
    - root_account (form, optional): The domain of the account to search for the user. Will be a no-op
      unless the sis_user_id or integration_id parameter is also included.

- **DELETE** /v1/courses/{course_id}/enrollments/{id}
    - Description: Conclude, deactivate, or delete an enrollment
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - task (query, optional): The action to take on the enrollment.
          When inactive, a user will still appear in the course roster to admins, but be unable to participate.
          ("inactivate" and "deactivate" are equivalent tasks)

- **POST** /v1/courses/{course_id}/enrollments/{id}/accept
    - Description: Accept Course Invitation
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/enrollments/{id}/reject
    - Description: Reject Course Invitation
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/courses/{course_id}/enrollments/{id}/reactivate
    - Description: Re-activate an enrollment
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/courses/{course_id}/users/{user_id}/last_attended
    - Description: Add last attended date
    - Parameters:
        - course_id (path, required): ID
        - user_id (path, required): ID
        - date (form, optional): The last attended date of a student enrollment in a course.

- **GET** /v1/users/{user_id}/temporary_enrollment_status
    - Description: Show Temporary Enrollment recipient and provider status
    - Parameters:
        - user_id (path, required): ID
        - account_id (query, optional): The ID of the account to check for temporary enrollment status.
          Defaults to the domain root account if not provided.

### ePortfolios

Path: `/e_portfolios.json`

- **GET** /v1/users/{user_id}/eportfolios
    - Description: Get all ePortfolios for a User
    - Parameters:
        - user_id (path, required): ID
        - include (query, optional): deleted:: Include deleted ePortfolios. Only available to admins who can
          moderate_user_content.

- **GET** /v1/eportfolios/{id}
    - Description: Get an ePortfolio
    - Parameters:
        - id (path, required): ID

- **DELETE** /v1/eportfolios/{id}
    - Description: Delete an ePortfolio
    - Parameters:
        - id (path, required): ID

- **GET** /v1/eportfolios/{eportfolio_id}/pages
    - Description: Get ePortfolio Pages
    - Parameters:
        - eportfolio_id (path, required): ID

- **PUT** /v1/eportfolios/{eportfolio_id}/moderate
    - Description: Moderate an ePortfolio
    - Parameters:
        - eportfolio_id (path, required): ID
        - spam_status (form, optional): The spam status for the ePortfolio

- **PUT** /v1/users/{user_id}/eportfolios
    - Description: Moderate all ePortfolios for a User
    - Parameters:
        - user_id (path, required): ID
        - spam_status (form, optional): The spam status for all the ePortfolios

- **PUT** /v1/eportfolios/{eportfolio_id}/restore
    - Description: Restore a deleted ePortfolio
    - Parameters:
        - eportfolio_id (path, required): ID

### ePub Exports

Path: `/e_pub_exports.json`

- **GET** /v1/epub_exports
    - Description: List courses with their latest ePub export

- **POST** /v1/courses/{course_id}/epub_exports
    - Description: Create ePub Export
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/epub_exports/{id}
    - Description: Show ePub export
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

### Error Reports

Path: `/error_reports.json`

- **POST** /v1/error_reports
    - Description: Create Error Report
    - Parameters:
        - error[subject] (form, required): The summary of the problem
        - error[url] (form, optional): URL from which the report was issued
        - error[email] (form, optional): Email address for the reporting user
        - error[comments] (form, optional): The long version of the story from the user one what they experienced
        - error[http_env] (form, optional): A collection of metadata about the users' environment. If not provided,
          canvas will collect it based on information found in the request.
          (Doesn't have to be HTTPENV info, could be anything JSON object that can be
          serialized as a hash, a mobile app might include relevant metadata for
          itself)

### External Tools

Path: `/external_tools.json`

- **GET** /v1/courses/{course_id}/external_tools
    - Description: List external tools
    - Parameters:
        - course_id (path, required): ID
        - search_term (query, optional): The partial name of the tools to match and return.
        - selectable (query, optional): If true, then only tools that are meant to be selectable are returned.
        - include_parents (query, optional): If true, then include tools installed in all accounts above the current
          context
        - placement (query, optional): The placement type to filter by.

- **GET** /v1/accounts/{account_id}/external_tools
    - Description: List external tools
    - Parameters:
        - account_id (path, required): ID
        - search_term (query, optional): The partial name of the tools to match and return.
        - selectable (query, optional): If true, then only tools that are meant to be selectable are returned.
        - include_parents (query, optional): If true, then include tools installed in all accounts above the current
          context
        - placement (query, optional): The placement type to filter by.

- **GET** /v1/groups/{group_id}/external_tools
    - Description: List external tools
    - Parameters:
        - group_id (path, required): ID
        - search_term (query, optional): The partial name of the tools to match and return.
        - selectable (query, optional): If true, then only tools that are meant to be selectable are returned.
        - include_parents (query, optional): If true, then include tools installed in all accounts above the current
          context
        - placement (query, optional): The placement type to filter by.

- **GET** /v1/courses/{course_id}/external_tools/sessionless_launch
    - Description: Get a sessionless launch url for an external tool.
    - Parameters:
        - course_id (path, required): ID
        - id (query, optional): The external id of the tool to launch.
        - url (query, optional): The LTI launch url for the external tool.
        - assignment_id (query, optional): The assignment id for an assignment launch. Required if launch_type is set
          to "assessment".
        - module_item_id (query, optional): The assignment id for a module item launch. Required if launch_type is set
          to "module_item".
        - launch_type (query, optional): The type of launch to perform on the external tool. Placement names (eg. "
          course_navigation")
          can also be specified to use the custom launch url for that placement; if done, the tool id
          must be provided.
        - resource_link_lookup_uuid (query, optional): The identifier to lookup a resource link.

- **GET** /v1/accounts/{account_id}/external_tools/sessionless_launch
    - Description: Get a sessionless launch url for an external tool.
    - Parameters:
        - account_id (path, required): ID
        - id (query, optional): The external id of the tool to launch.
        - url (query, optional): The LTI launch url for the external tool.
        - assignment_id (query, optional): The assignment id for an assignment launch. Required if launch_type is set
          to "assessment".
        - module_item_id (query, optional): The assignment id for a module item launch. Required if launch_type is set
          to "module_item".
        - launch_type (query, optional): The type of launch to perform on the external tool. Placement names (eg. "
          course_navigation")
          can also be specified to use the custom launch url for that placement; if done, the tool id
          must be provided.
        - resource_link_lookup_uuid (query, optional): The identifier to lookup a resource link.

- **GET** /v1/courses/{course_id}/external_tools/{external_tool_id}
    - Description: Get a single external tool
    - Parameters:
        - course_id (path, required): ID
        - external_tool_id (path, required): ID

- **GET** /v1/accounts/{account_id}/external_tools/{external_tool_id}
    - Description: Get a single external tool
    - Parameters:
        - account_id (path, required): ID
        - external_tool_id (path, required): ID

- **POST** /v1/courses/{course_id}/external_tools
    - Description: Create an external tool
    - Parameters:
        - course_id (path, required): ID
        - client_id (form, required): The client id is attached to the developer key.
          If supplied all other parameters are unnecessary and will be ignored
        - name (form, required): The name of the tool
        - privacy_level (form, required): How much user information to send to the external tool.
        - consumer_key (form, required): The consumer key for the external tool
        - shared_secret (form, required): The shared secret with the external tool
        - description (form, optional): A description of the tool
        - url (form, optional): The url to match links against. Either "url" or "domain" should be set,
          not both.
        - domain (form, optional): The domain to match links against. Either "url" or "domain" should be
          set, not both.
        - icon_url (form, optional): The url of the icon to show for this tool
        - text (form, optional): The default text to show for this tool
        - custom_fields[field_name] (form, optional): Custom fields that will be sent to the tool consumer; can be used
          multiple times
        - is_rce_favorite (form, optional): (Deprecated in favor of {api:ExternalToolsController#add_rce_favorite Add
          tool to RCE Favorites} and
          {api:ExternalToolsController#remove_rce_favorite Remove tool from RCE Favorites})
          Whether this tool should appear in a preferred location in the RCE.
          This only applies to tools in root account contexts that have an editor
          button placement.
        - account_navigation[url] (form, optional): The url of the external tool for account navigation
        - account_navigation[enabled] (form, optional): Set this to enable this feature
        - account_navigation[text] (form, optional): The text that will show on the left-tab in the account navigation
        - account_navigation[selection_width] (form, optional): The width of the dialog the tool is launched in
        - account_navigation[selection_height] (form, optional): The height of the dialog the tool is launched in
        - account_navigation[display_type] (form, optional): The layout type to use when launching the tool. Must be
          "full_width", "full_width_in_context", "in_nav_context", "borderless", or "default"
        - user_navigation[url] (form, optional): The url of the external tool for user navigation
        - user_navigation[enabled] (form, optional): Set this to enable this feature
        - user_navigation[text] (form, optional): The text that will show on the left-tab in the user navigation
        - user_navigation[visibility] (form, optional): Who will see the navigation tab. "admins" for admins, "public"
          or
          "members" for everyone. Setting this to `null` will remove this configuration
          and use the default behavior, which is "public".
        - course_home_sub_navigation[url] (form, optional): The url of the external tool for right-side course home
          navigation menu
        - course_home_sub_navigation[enabled] (form, optional): Set this to enable this feature
        - course_home_sub_navigation[text] (form, optional): The text that will show on the right-side course home
          navigation menu
        - course_home_sub_navigation[icon_url] (form, optional): The url of the icon to show in the right-side course
          home navigation menu
        - course_navigation[enabled] (form, optional): Set this to enable this feature
        - course_navigation[text] (form, optional): The text that will show on the left-tab in the course navigation
        - course_navigation[visibility] (form, optional): Who will see the navigation tab. "admins" for course admins, "
          members" for
          students, "public" for everyone. Setting this to `null` will remove this configuration
          and use the default behavior, which is "public".
        - course_navigation[windowTarget] (form, optional): Determines how the navigation tab will be opened.
          "_blank"    Launches the external tool in a new window or tab.
          "_self"    (Default) Launches the external tool in an iframe inside of Canvas.
        - course_navigation[default] (form, optional): If set to "disabled" the tool will not appear in the course
          navigation
          until a teacher explicitly enables it.

If set to "enabled" the tool will appear in the course navigation
without requiring a teacher to explicitly enable it.

defaults to "enabled"
- course_navigation[display_type] (form, optional): The layout type to use when launching the tool. Must be
"full_width", "full_width_in_context", "in_nav_context", "borderless", or "default"
- editor_button[url] (form, optional): The url of the external tool
- editor_button[enabled] (form, optional): Set this to enable this feature
- editor_button[icon_url] (form, optional): The url of the icon to show in the WYSIWYG editor
- editor_button[selection_width] (form, optional): The width of the dialog the tool is launched in
- editor_button[selection_height] (form, optional): The height of the dialog the tool is launched in
- editor_button[message_type] (form, optional): Set this to ContentItemSelectionRequest to tell the tool to use
content-item; otherwise, omit
- homework_submission[url] (form, optional): The url of the external tool
- homework_submission[enabled] (form, optional): Set this to enable this feature
- homework_submission[text] (form, optional): The text that will show on the homework submission tab
- homework_submission[message_type] (form, optional): Set this to ContentItemSelectionRequest to tell the tool to use
content-item; otherwise, omit
- link_selection[url] (form, optional): The url of the external tool
- link_selection[enabled] (form, optional): Set this to enable this feature
- link_selection[text] (form, optional): The text that will show for the link selection text
- link_selection[message_type] (form, optional): Set this to ContentItemSelectionRequest to tell the tool to use
content-item; otherwise, omit
- migration_selection[url] (form, optional): The url of the external tool
- migration_selection[enabled] (form, optional): Set this to enable this feature
- migration_selection[message_type] (form, optional): Set this to ContentItemSelectionRequest to tell the tool to use
content-item; otherwise, omit
- tool_configuration[url] (form, optional): The url of the external tool
- tool_configuration[enabled] (form, optional): Set this to enable this feature
- tool_configuration[message_type] (form, optional): Set this to ContentItemSelectionRequest to tell the tool to use
content-item; otherwise, omit
- tool_configuration[prefer_sis_email] (form, optional): Set this to default the lis_person_contact_email_primary to
prefer
provisioned sis_email; otherwise, omit
- resource_selection[url] (form, optional): The url of the external tool
- resource_selection[enabled] (form, optional): Set this to enable this feature. If set to false,
not_selectable must also be set to true in order to hide this tool
from the selection UI in modules and assignments.
- resource_selection[icon_url] (form, optional): The url of the icon to show in the module external tool list
- resource_selection[selection_width] (form, optional): The width of the dialog the tool is launched in
- resource_selection[selection_height] (form, optional): The height of the dialog the tool is launched in
- config_type (form, optional): Configuration can be passed in as CC xml instead of using query
parameters. If this value is "by_url" or "by_xml" then an xml
configuration will be expected in either the "config_xml" or "config_url"
parameter. Note that the name parameter overrides the tool name provided
in the xml
- config_xml (form, optional): XML tool configuration, as specified in the CC xml specification. This is
required if "config_type" is set to "by_xml"
- config_url (form, optional): URL where the server can retrieve an XML tool configuration, as specified
in the CC xml specification. This is required if "config_type" is set to
"by_url"
- not_selectable (form, optional): Default: false. If set to true, and if resource_selection is set to false,
the tool won't show up in the external tool
selection UI in modules and assignments
- oauth_compliant (form, optional): Default: false, if set to true LTI query params will not be copied to the
post body.
- unified_tool_id (form, optional): The unique identifier for the tool in LearnPlatform

- **POST** /v1/accounts/{account_id}/external_tools
    - Description: Create an external tool
    - Parameters:
        - account_id (path, required): ID
        - client_id (form, required): The client id is attached to the developer key.
          If supplied all other parameters are unnecessary and will be ignored
        - name (form, required): The name of the tool
        - privacy_level (form, required): How much user information to send to the external tool.
        - consumer_key (form, required): The consumer key for the external tool
        - shared_secret (form, required): The shared secret with the external tool
        - description (form, optional): A description of the tool
        - url (form, optional): The url to match links against. Either "url" or "domain" should be set,
          not both.
        - domain (form, optional): The domain to match links against. Either "url" or "domain" should be
          set, not both.
        - icon_url (form, optional): The url of the icon to show for this tool
        - text (form, optional): The default text to show for this tool
        - custom_fields[field_name] (form, optional): Custom fields that will be sent to the tool consumer; can be used
          multiple times
        - is_rce_favorite (form, optional): (Deprecated in favor of {api:ExternalToolsController#add_rce_favorite Add
          tool to RCE Favorites} and
          {api:ExternalToolsController#remove_rce_favorite Remove tool from RCE Favorites})
          Whether this tool should appear in a preferred location in the RCE.
          This only applies to tools in root account contexts that have an editor
          button placement.
        - account_navigation[url] (form, optional): The url of the external tool for account navigation
        - account_navigation[enabled] (form, optional): Set this to enable this feature
        - account_navigation[text] (form, optional): The text that will show on the left-tab in the account navigation
        - account_navigation[selection_width] (form, optional): The width of the dialog the tool is launched in
        - account_navigation[selection_height] (form, optional): The height of the dialog the tool is launched in
        - account_navigation[display_type] (form, optional): The layout type to use when launching the tool. Must be
          "full_width", "full_width_in_context", "in_nav_context", "borderless", or "default"
        - user_navigation[url] (form, optional): The url of the external tool for user navigation
        - user_navigation[enabled] (form, optional): Set this to enable this feature
        - user_navigation[text] (form, optional): The text that will show on the left-tab in the user navigation
        - user_navigation[visibility] (form, optional): Who will see the navigation tab. "admins" for admins, "public"
          or
          "members" for everyone. Setting this to `null` will remove this configuration
          and use the default behavior, which is "public".
        - course_home_sub_navigation[url] (form, optional): The url of the external tool for right-side course home
          navigation menu
        - course_home_sub_navigation[enabled] (form, optional): Set this to enable this feature
        - course_home_sub_navigation[text] (form, optional): The text that will show on the right-side course home
          navigation menu
        - course_home_sub_navigation[icon_url] (form, optional): The url of the icon to show in the right-side course
          home navigation menu
        - course_navigation[enabled] (form, optional): Set this to enable this feature
        - course_navigation[text] (form, optional): The text that will show on the left-tab in the course navigation
        - course_navigation[visibility] (form, optional): Who will see the navigation tab. "admins" for course admins, "
          members" for
          students, "public" for everyone. Setting this to `null` will remove this configuration
          and use the default behavior, which is "public".
        - course_navigation[windowTarget] (form, optional): Determines how the navigation tab will be opened.
          "_blank"    Launches the external tool in a new window or tab.
          "_self"    (Default) Launches the external tool in an iframe inside of Canvas.
        - course_navigation[default] (form, optional): If set to "disabled" the tool will not appear in the course
          navigation
          until a teacher explicitly enables it.

If set to "enabled" the tool will appear in the course navigation
without requiring a teacher to explicitly enable it.

defaults to "enabled"
- course_navigation[display_type] (form, optional): The layout type to use when launching the tool. Must be
"full_width", "full_width_in_context", "in_nav_context", "borderless", or "default"
- editor_button[url] (form, optional): The url of the external tool
- editor_button[enabled] (form, optional): Set this to enable this feature
- editor_button[icon_url] (form, optional): The url of the icon to show in the WYSIWYG editor
- editor_button[selection_width] (form, optional): The width of the dialog the tool is launched in
- editor_button[selection_height] (form, optional): The height of the dialog the tool is launched in
- editor_button[message_type] (form, optional): Set this to ContentItemSelectionRequest to tell the tool to use
content-item; otherwise, omit
- homework_submission[url] (form, optional): The url of the external tool
- homework_submission[enabled] (form, optional): Set this to enable this feature
- homework_submission[text] (form, optional): The text that will show on the homework submission tab
- homework_submission[message_type] (form, optional): Set this to ContentItemSelectionRequest to tell the tool to use
content-item; otherwise, omit
- link_selection[url] (form, optional): The url of the external tool
- link_selection[enabled] (form, optional): Set this to enable this feature
- link_selection[text] (form, optional): The text that will show for the link selection text
- link_selection[message_type] (form, optional): Set this to ContentItemSelectionRequest to tell the tool to use
content-item; otherwise, omit
- migration_selection[url] (form, optional): The url of the external tool
- migration_selection[enabled] (form, optional): Set this to enable this feature
- migration_selection[message_type] (form, optional): Set this to ContentItemSelectionRequest to tell the tool to use
content-item; otherwise, omit
- tool_configuration[url] (form, optional): The url of the external tool
- tool_configuration[enabled] (form, optional): Set this to enable this feature
- tool_configuration[message_type] (form, optional): Set this to ContentItemSelectionRequest to tell the tool to use
content-item; otherwise, omit
- tool_configuration[prefer_sis_email] (form, optional): Set this to default the lis_person_contact_email_primary to
prefer
provisioned sis_email; otherwise, omit
- resource_selection[url] (form, optional): The url of the external tool
- resource_selection[enabled] (form, optional): Set this to enable this feature. If set to false,
not_selectable must also be set to true in order to hide this tool
from the selection UI in modules and assignments.
- resource_selection[icon_url] (form, optional): The url of the icon to show in the module external tool list
- resource_selection[selection_width] (form, optional): The width of the dialog the tool is launched in
- resource_selection[selection_height] (form, optional): The height of the dialog the tool is launched in
- config_type (form, optional): Configuration can be passed in as CC xml instead of using query
parameters. If this value is "by_url" or "by_xml" then an xml
configuration will be expected in either the "config_xml" or "config_url"
parameter. Note that the name parameter overrides the tool name provided
in the xml
- config_xml (form, optional): XML tool configuration, as specified in the CC xml specification. This is
required if "config_type" is set to "by_xml"
- config_url (form, optional): URL where the server can retrieve an XML tool configuration, as specified
in the CC xml specification. This is required if "config_type" is set to
"by_url"
- not_selectable (form, optional): Default: false. If set to true, and if resource_selection is set to false,
the tool won't show up in the external tool
selection UI in modules and assignments
- oauth_compliant (form, optional): Default: false, if set to true LTI query params will not be copied to the
post body.
- unified_tool_id (form, optional): The unique identifier for the tool in LearnPlatform

- **PUT** /v1/courses/{course_id}/external_tools/{external_tool_id}
    - Description: Edit an external tool
    - Parameters:
        - course_id (path, required): ID
        - external_tool_id (path, required): ID

- **PUT** /v1/accounts/{account_id}/external_tools/{external_tool_id}
    - Description: Edit an external tool
    - Parameters:
        - account_id (path, required): ID
        - external_tool_id (path, required): ID

- **DELETE** /v1/courses/{course_id}/external_tools/{external_tool_id}
    - Description: Delete an external tool
    - Parameters:
        - course_id (path, required): ID
        - external_tool_id (path, required): ID

- **DELETE** /v1/accounts/{account_id}/external_tools/{external_tool_id}
    - Description: Delete an external tool
    - Parameters:
        - account_id (path, required): ID
        - external_tool_id (path, required): ID

- **POST** /v1/accounts/{account_id}/external_tools/rce_favorites/{id}
    - Description: Add tool to RCE Favorites
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/accounts/{account_id}/external_tools/rce_favorites/{id}
    - Description: Remove tool from RCE Favorites
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/accounts/{account_id}/external_tools/top_nav_favorites/{id}
    - Description: Add tool to Top Navigation Favorites
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/accounts/{account_id}/external_tools/top_nav_favorites/{id}
    - Description: Remove tool from Top Navigation Favorites
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/external_tools/visible_course_nav_tools
    - Description: Get visible course navigation tools
    - Parameters:
        - context_codes (query, required): List of context_codes to retrieve visible course nav tools for (for example,
          +course_123+). Only
          courses are presently supported.

- **GET** /v1/courses/{course_id}/external_tools/visible_course_nav_tools
    - Description: Get visible course navigation tools for a single course
    - Parameters:
        - course_id (path, required): ID

### Favorites

Path: `/favorites.json`

- **GET** /v1/users/self/favorites/courses
    - Description: List favorite courses
    - Parameters:
        - exclude_blueprint_courses (query, optional): When set, only return courses that are not configured as
          blueprint courses.

- **GET** /v1/users/self/favorites/groups
    - Description: List favorite groups

- **POST** /v1/users/self/favorites/courses/{id}
    - Description: Add course to favorites
    - Parameters:
        - id (path, required): The ID or SIS ID of the course to add. The current user must be
          registered in the course.

- **POST** /v1/users/self/favorites/groups/{id}
    - Description: Add group to favorites
    - Parameters:
        - id (path, required): The ID or SIS ID of the group to add. The current user must be
          a member of the group.

- **DELETE** /v1/users/self/favorites/courses/{id}
    - Description: Remove course from favorites
    - Parameters:
        - id (path, required): the ID or SIS ID of the course to remove

- **DELETE** /v1/users/self/favorites/groups/{id}
    - Description: Remove group from favorites
    - Parameters:
        - id (path, required): the ID or SIS ID of the group to remove

- **DELETE** /v1/users/self/favorites/courses
    - Description: Reset course favorites

- **DELETE** /v1/users/self/favorites/groups
    - Description: Reset group favorites

### Feature Flags

Path: `/feature_flags.json`

- **GET** /v1/courses/{course_id}/features
    - Description: List features
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/accounts/{account_id}/features
    - Description: List features
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/users/{user_id}/features
    - Description: List features
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/courses/{course_id}/features/enabled
    - Description: List enabled features
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/accounts/{account_id}/features/enabled
    - Description: List enabled features
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/users/{user_id}/features/enabled
    - Description: List enabled features
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/features/environment
    - Description: List environment features

- **GET** /v1/courses/{course_id}/features/flags/{feature}
    - Description: Get feature flag
    - Parameters:
        - course_id (path, required): ID
        - feature (path, required): ID

- **GET** /v1/accounts/{account_id}/features/flags/{feature}
    - Description: Get feature flag
    - Parameters:
        - account_id (path, required): ID
        - feature (path, required): ID

- **GET** /v1/users/{user_id}/features/flags/{feature}
    - Description: Get feature flag
    - Parameters:
        - user_id (path, required): ID
        - feature (path, required): ID

- **PUT** /v1/courses/{course_id}/features/flags/{feature}
    - Description: Set feature flag
    - Parameters:
        - course_id (path, required): ID
        - feature (path, required): ID
        - state (form, optional): "off":: The feature is not available for the course, user, or account and
          sub-accounts.
          "allowed":: (valid only on accounts) The feature is off in the account, but may be enabled in
          sub-accounts and courses by setting a feature flag on the sub-account or course.
          "on":: The feature is turned on unconditionally for the user, course, or account and sub-accounts.

- **PUT** /v1/accounts/{account_id}/features/flags/{feature}
    - Description: Set feature flag
    - Parameters:
        - account_id (path, required): ID
        - feature (path, required): ID
        - state (form, optional): "off":: The feature is not available for the course, user, or account and
          sub-accounts.
          "allowed":: (valid only on accounts) The feature is off in the account, but may be enabled in
          sub-accounts and courses by setting a feature flag on the sub-account or course.
          "on":: The feature is turned on unconditionally for the user, course, or account and sub-accounts.

- **PUT** /v1/users/{user_id}/features/flags/{feature}
    - Description: Set feature flag
    - Parameters:
        - user_id (path, required): ID
        - feature (path, required): ID
        - state (form, optional): "off":: The feature is not available for the course, user, or account and
          sub-accounts.
          "allowed":: (valid only on accounts) The feature is off in the account, but may be enabled in
          sub-accounts and courses by setting a feature flag on the sub-account or course.
          "on":: The feature is turned on unconditionally for the user, course, or account and sub-accounts.

- **DELETE** /v1/courses/{course_id}/features/flags/{feature}
    - Description: Remove feature flag
    - Parameters:
        - course_id (path, required): ID
        - feature (path, required): ID

- **DELETE** /v1/accounts/{account_id}/features/flags/{feature}
    - Description: Remove feature flag
    - Parameters:
        - account_id (path, required): ID
        - feature (path, required): ID

- **DELETE** /v1/users/{user_id}/features/flags/{feature}
    - Description: Remove feature flag
    - Parameters:
        - user_id (path, required): ID
        - feature (path, required): ID

### Files

Path: `/files.json`

- **GET** /v1/courses/{course_id}/files/quota
    - Description: Get quota information
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/files/quota
    - Description: Get quota information
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/users/{user_id}/files/quota
    - Description: Get quota information
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/courses/{course_id}/files
    - Description: List files
    - Parameters:
        - course_id (path, required): ID
        - content_types (query, optional): Filter results by content-type. You can specify type/subtype pairs (e.g.,
          'image/jpeg'), or simply types (e.g., 'image', which will match
          'image/gif', 'image/jpeg', etc.).
        - exclude_content_types (query, optional): Exclude given content-types from your results. You can specify
          type/subtype pairs (e.g.,
          'image/jpeg'), or simply types (e.g., 'image', which will match
          'image/gif', 'image/jpeg', etc.).
        - search_term (query, optional): The partial name of the files to match and return.
        - include (query, optional): Array of additional information to include.

"user":: the user who uploaded the file or last edited its content
"usage_rights":: copyright and license information for the file (see UsageRights)
- only (query, optional): Array of information to restrict to. Overrides include[]

"names":: only returns file name information
- sort (query, optional): Sort results by this field. Defaults to 'name'. Note that `sort=user` implies
`include[]=user`.
- order (query, optional): The sorting order. Defaults to 'asc'.

- **GET** /v1/users/{user_id}/files
    - Description: List files
    - Parameters:
        - user_id (path, required): ID
        - content_types (query, optional): Filter results by content-type. You can specify type/subtype pairs (e.g.,
          'image/jpeg'), or simply types (e.g., 'image', which will match
          'image/gif', 'image/jpeg', etc.).
        - exclude_content_types (query, optional): Exclude given content-types from your results. You can specify
          type/subtype pairs (e.g.,
          'image/jpeg'), or simply types (e.g., 'image', which will match
          'image/gif', 'image/jpeg', etc.).
        - search_term (query, optional): The partial name of the files to match and return.
        - include (query, optional): Array of additional information to include.

"user":: the user who uploaded the file or last edited its content
"usage_rights":: copyright and license information for the file (see UsageRights)
- only (query, optional): Array of information to restrict to. Overrides include[]

"names":: only returns file name information
- sort (query, optional): Sort results by this field. Defaults to 'name'. Note that `sort=user` implies
`include[]=user`.
- order (query, optional): The sorting order. Defaults to 'asc'.

- **GET** /v1/groups/{group_id}/files
    - Description: List files
    - Parameters:
        - group_id (path, required): ID
        - content_types (query, optional): Filter results by content-type. You can specify type/subtype pairs (e.g.,
          'image/jpeg'), or simply types (e.g., 'image', which will match
          'image/gif', 'image/jpeg', etc.).
        - exclude_content_types (query, optional): Exclude given content-types from your results. You can specify
          type/subtype pairs (e.g.,
          'image/jpeg'), or simply types (e.g., 'image', which will match
          'image/gif', 'image/jpeg', etc.).
        - search_term (query, optional): The partial name of the files to match and return.
        - include (query, optional): Array of additional information to include.

"user":: the user who uploaded the file or last edited its content
"usage_rights":: copyright and license information for the file (see UsageRights)
- only (query, optional): Array of information to restrict to. Overrides include[]

"names":: only returns file name information
- sort (query, optional): Sort results by this field. Defaults to 'name'. Note that `sort=user` implies
`include[]=user`.
- order (query, optional): The sorting order. Defaults to 'asc'.

- **GET** /v1/folders/{id}/files
    - Description: List files
    - Parameters:
        - id (path, required): ID
        - content_types (query, optional): Filter results by content-type. You can specify type/subtype pairs (e.g.,
          'image/jpeg'), or simply types (e.g., 'image', which will match
          'image/gif', 'image/jpeg', etc.).
        - exclude_content_types (query, optional): Exclude given content-types from your results. You can specify
          type/subtype pairs (e.g.,
          'image/jpeg'), or simply types (e.g., 'image', which will match
          'image/gif', 'image/jpeg', etc.).
        - search_term (query, optional): The partial name of the files to match and return.
        - include (query, optional): Array of additional information to include.

"user":: the user who uploaded the file or last edited its content
"usage_rights":: copyright and license information for the file (see UsageRights)
- only (query, optional): Array of information to restrict to. Overrides include[]

"names":: only returns file name information
- sort (query, optional): Sort results by this field. Defaults to 'name'. Note that `sort=user` implies
`include[]=user`.
- order (query, optional): The sorting order. Defaults to 'asc'.

- **GET** /v1/files/{id}/public_url
    - Description: Get public inline preview url
    - Parameters:
        - id (path, required): ID
        - submission_id (query, optional): The id of the submission the file is associated with. Provide this argument
          to gain access to a file
          that has been submitted to an assignment (Canvas will verify that the file belongs to the submission
          and the calling user has rights to view the submission).

- **GET** /v1/files/{id}
    - Description: Get file
    - Parameters:
        - id (path, required): ID
        - include (query, optional): Array of additional information to include.

"user":: the user who uploaded the file or last edited its content
"usage_rights":: copyright and license information for the file (see UsageRights)
- replacement_chain_context_type (query, optional): When a user replaces a file during upload, Canvas keeps track of
the "replacement chain."

Include this parameter if you wish Canvas to follow the replacement chain if the requested
file was deleted and replaced by another.

Must be set to 'course' or 'account'. The "replacement_chain_context_id" parameter must
also be included.
- replacement_chain_context_id (query, optional): When a user replaces a file during upload, Canvas keeps track of the "
replacement chain."

Include this parameter if you wish Canvas to follow the replacement chain if the requested
file was deleted and replaced by another.

Indicates the context ID Canvas should use when following the "replacement chain." The
"replacement_chain_context_type" parameter must also be included.

- **GET** /v1/courses/{course_id}/files/{id}
    - Description: Get file
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): Array of additional information to include.

"user":: the user who uploaded the file or last edited its content
"usage_rights":: copyright and license information for the file (see UsageRights)
- replacement_chain_context_type (query, optional): When a user replaces a file during upload, Canvas keeps track of
the "replacement chain."

Include this parameter if you wish Canvas to follow the replacement chain if the requested
file was deleted and replaced by another.

Must be set to 'course' or 'account'. The "replacement_chain_context_id" parameter must
also be included.
- replacement_chain_context_id (query, optional): When a user replaces a file during upload, Canvas keeps track of the "
replacement chain."

Include this parameter if you wish Canvas to follow the replacement chain if the requested
file was deleted and replaced by another.

Indicates the context ID Canvas should use when following the "replacement chain." The
"replacement_chain_context_type" parameter must also be included.

- **GET** /v1/groups/{group_id}/files/{id}
    - Description: Get file
    - Parameters:
        - group_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): Array of additional information to include.

"user":: the user who uploaded the file or last edited its content
"usage_rights":: copyright and license information for the file (see UsageRights)
- replacement_chain_context_type (query, optional): When a user replaces a file during upload, Canvas keeps track of
the "replacement chain."

Include this parameter if you wish Canvas to follow the replacement chain if the requested
file was deleted and replaced by another.

Must be set to 'course' or 'account'. The "replacement_chain_context_id" parameter must
also be included.
- replacement_chain_context_id (query, optional): When a user replaces a file during upload, Canvas keeps track of the "
replacement chain."

Include this parameter if you wish Canvas to follow the replacement chain if the requested
file was deleted and replaced by another.

Indicates the context ID Canvas should use when following the "replacement chain." The
"replacement_chain_context_type" parameter must also be included.

- **GET** /v1/users/{user_id}/files/{id}
    - Description: Get file
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): Array of additional information to include.

"user":: the user who uploaded the file or last edited its content
"usage_rights":: copyright and license information for the file (see UsageRights)
- replacement_chain_context_type (query, optional): When a user replaces a file during upload, Canvas keeps track of
the "replacement chain."

Include this parameter if you wish Canvas to follow the replacement chain if the requested
file was deleted and replaced by another.

Must be set to 'course' or 'account'. The "replacement_chain_context_id" parameter must
also be included.
- replacement_chain_context_id (query, optional): When a user replaces a file during upload, Canvas keeps track of the "
replacement chain."

Include this parameter if you wish Canvas to follow the replacement chain if the requested
file was deleted and replaced by another.

Indicates the context ID Canvas should use when following the "replacement chain." The
"replacement_chain_context_type" parameter must also be included.

- **GET** /v1/courses/{course_id}/files/file_ref/{migration_id}
    - Description: Translate file reference
    - Parameters:
        - course_id (path, required): ID
        - migration_id (path, required): ID

- **PUT** /v1/files/{id}
    - Description: Update file
    - Parameters:
        - id (path, required): ID
        - name (form, optional): The new display name of the file, with a limit of 255 characters.
        - parent_folder_id (form, optional): The id of the folder to move this file into.
          The new folder must be in the same context as the original parent folder.
          If the file is in a context without folders this does not apply.
        - on_duplicate (form, optional): If the file is moved to a folder containing a file with the same name,
          or renamed to a name matching an existing file, the API call will fail
          unless this parameter is supplied.

"overwrite":: Replace the existing file with the same name
"rename":: Add a qualifier to make the new filename unique
- lock_at (form, optional): The datetime to lock the file at
- unlock_at (form, optional): The datetime to unlock the file at
- locked (form, optional): Flag the file as locked
- hidden (form, optional): Flag the file as hidden
- visibility_level (form, optional): Configure which roles can access this file

- **DELETE** /v1/files/{id}
    - Description: Delete file
    - Parameters:
        - id (path, required): ID
        - replace (query, optional): This action is irreversible.
          If replace is set to true the file contents will be replaced with a
          generic "file has been removed" file. This also destroys any previews
          that have been generated for the file.
          Must have manage files and become other users permissions

- **GET** /v1/files/{id}/icon_metadata
    - Description: Get icon metadata
    - Parameters:
        - id (path, required): ID

- **POST** /v1/files/{id}/reset_verifier
    - Description: Reset link verifier
    - Parameters:
        - id (path, required): ID

- **GET** /v1/folders/{id}/folders
    - Description: List folders
    - Parameters:
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/folders
    - Description: List all folders
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/users/{user_id}/folders
    - Description: List all folders
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/groups/{group_id}/folders
    - Description: List all folders
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/courses/{course_id}/folders/by_path/*full_path
    - Description: Resolve path
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/folders/by_path
    - Description: Resolve path
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/users/{user_id}/folders/by_path/*full_path
    - Description: Resolve path
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/users/{user_id}/folders/by_path
    - Description: Resolve path
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/groups/{group_id}/folders/by_path/*full_path
    - Description: Resolve path
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/groups/{group_id}/folders/by_path
    - Description: Resolve path
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/courses/{course_id}/folders/{id}
    - Description: Get folder
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/users/{user_id}/folders/{id}
    - Description: Get folder
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/groups/{group_id}/folders/{id}
    - Description: Get folder
    - Parameters:
        - group_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/folders/{id}
    - Description: Get folder
    - Parameters:
        - id (path, required): ID

- **PUT** /v1/folders/{id}
    - Description: Update folder
    - Parameters:
        - id (path, required): ID
        - name (form, optional): The new name of the folder
        - parent_folder_id (form, optional): The id of the folder to move this folder into. The new folder must be in
          the same context as the original parent folder.
        - lock_at (form, optional): The datetime to lock the folder at
        - unlock_at (form, optional): The datetime to unlock the folder at
        - locked (form, optional): Flag the folder as locked
        - hidden (form, optional): Flag the folder as hidden
        - position (form, optional): Set an explicit sort position for the folder

- **POST** /v1/courses/{course_id}/folders
    - Description: Create folder
    - Parameters:
        - course_id (path, required): ID
        - name (form, required): The name of the folder
        - parent_folder_id (form, optional): The id of the folder to store the new folder in. An error will be returned
          if this does not correspond to an existing folder. If this and parent_folder_path are sent an error will be
          returned. If neither is given, a default folder will be used.
        - parent_folder_path (form, optional): The path of the folder to store the new folder in. The path separator is
          the forward slash `/`, never a back slash. The parent folder will be created if it does not already exist.
          This parameter only applies to new folders in a context that has folders, such as a user, a course, or a
          group. If this and parent_folder_id are sent an error will be returned. If neither is given, a default folder
          will be used.
        - lock_at (form, optional): The datetime to lock the folder at
        - unlock_at (form, optional): The datetime to unlock the folder at
        - locked (form, optional): Flag the folder as locked
        - hidden (form, optional): Flag the folder as hidden
        - position (form, optional): Set an explicit sort position for the folder

- **POST** /v1/users/{user_id}/folders
    - Description: Create folder
    - Parameters:
        - user_id (path, required): ID
        - name (form, required): The name of the folder
        - parent_folder_id (form, optional): The id of the folder to store the new folder in. An error will be returned
          if this does not correspond to an existing folder. If this and parent_folder_path are sent an error will be
          returned. If neither is given, a default folder will be used.
        - parent_folder_path (form, optional): The path of the folder to store the new folder in. The path separator is
          the forward slash `/`, never a back slash. The parent folder will be created if it does not already exist.
          This parameter only applies to new folders in a context that has folders, such as a user, a course, or a
          group. If this and parent_folder_id are sent an error will be returned. If neither is given, a default folder
          will be used.
        - lock_at (form, optional): The datetime to lock the folder at
        - unlock_at (form, optional): The datetime to unlock the folder at
        - locked (form, optional): Flag the folder as locked
        - hidden (form, optional): Flag the folder as hidden
        - position (form, optional): Set an explicit sort position for the folder

- **POST** /v1/groups/{group_id}/folders
    - Description: Create folder
    - Parameters:
        - group_id (path, required): ID
        - name (form, required): The name of the folder
        - parent_folder_id (form, optional): The id of the folder to store the new folder in. An error will be returned
          if this does not correspond to an existing folder. If this and parent_folder_path are sent an error will be
          returned. If neither is given, a default folder will be used.
        - parent_folder_path (form, optional): The path of the folder to store the new folder in. The path separator is
          the forward slash `/`, never a back slash. The parent folder will be created if it does not already exist.
          This parameter only applies to new folders in a context that has folders, such as a user, a course, or a
          group. If this and parent_folder_id are sent an error will be returned. If neither is given, a default folder
          will be used.
        - lock_at (form, optional): The datetime to lock the folder at
        - unlock_at (form, optional): The datetime to unlock the folder at
        - locked (form, optional): Flag the folder as locked
        - hidden (form, optional): Flag the folder as hidden
        - position (form, optional): Set an explicit sort position for the folder

- **POST** /v1/folders/{folder_id}/folders
    - Description: Create folder
    - Parameters:
        - folder_id (path, required): ID
        - name (form, required): The name of the folder
        - parent_folder_id (form, optional): The id of the folder to store the new folder in. An error will be returned
          if this does not correspond to an existing folder. If this and parent_folder_path are sent an error will be
          returned. If neither is given, a default folder will be used.
        - parent_folder_path (form, optional): The path of the folder to store the new folder in. The path separator is
          the forward slash `/`, never a back slash. The parent folder will be created if it does not already exist.
          This parameter only applies to new folders in a context that has folders, such as a user, a course, or a
          group. If this and parent_folder_id are sent an error will be returned. If neither is given, a default folder
          will be used.
        - lock_at (form, optional): The datetime to lock the folder at
        - unlock_at (form, optional): The datetime to unlock the folder at
        - locked (form, optional): Flag the folder as locked
        - hidden (form, optional): Flag the folder as hidden
        - position (form, optional): Set an explicit sort position for the folder

- **POST** /v1/accounts/{account_id}/folders
    - Description: Create folder
    - Parameters:
        - account_id (path, required): ID
        - name (form, required): The name of the folder
        - parent_folder_id (form, optional): The id of the folder to store the new folder in. An error will be returned
          if this does not correspond to an existing folder. If this and parent_folder_path are sent an error will be
          returned. If neither is given, a default folder will be used.
        - parent_folder_path (form, optional): The path of the folder to store the new folder in. The path separator is
          the forward slash `/`, never a back slash. The parent folder will be created if it does not already exist.
          This parameter only applies to new folders in a context that has folders, such as a user, a course, or a
          group. If this and parent_folder_id are sent an error will be returned. If neither is given, a default folder
          will be used.
        - lock_at (form, optional): The datetime to lock the folder at
        - unlock_at (form, optional): The datetime to unlock the folder at
        - locked (form, optional): Flag the folder as locked
        - hidden (form, optional): Flag the folder as hidden
        - position (form, optional): Set an explicit sort position for the folder

- **DELETE** /v1/folders/{id}
    - Description: Delete folder
    - Parameters:
        - id (path, required): ID
        - force (query, optional): Set to 'true' to allow deleting a non-empty folder

- **POST** /v1/folders/{folder_id}/files
    - Description: Upload a file
    - Parameters:
        - folder_id (path, required): ID

- **POST** /v1/folders/{dest_folder_id}/copy_file
    - Description: Copy a file
    - Parameters:
        - dest_folder_id (path, required): ID
        - source_file_id (form, required): The id of the source file
        - on_duplicate (form, optional): What to do if a file with the same name already exists at the destination.
          If such a file exists and this parameter is not given, the call will fail.

"overwrite":: Replace an existing file with the same name
"rename":: Add a qualifier to make the new filename unique

- **POST** /v1/folders/{dest_folder_id}/copy_folder
    - Description: Copy a folder
    - Parameters:
        - dest_folder_id (path, required): ID
        - source_folder_id (form, required): The id of the source folder

- **GET** /v1/courses/{course_id}/folders/media
    - Description: Get uploaded media folder for user
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/folders/media
    - Description: Get uploaded media folder for user
    - Parameters:
        - group_id (path, required): ID

- **PUT** /v1/courses/{course_id}/usage_rights
    - Description: Set usage rights
    - Parameters:
        - course_id (path, required): ID
        - file_ids (form, required): List of ids of files to set usage rights for.
        - folder_ids (form, optional): List of ids of folders to search for files to set usage rights for.
          Note that new files uploaded to these folders do not automatically inherit these rights.
        - publish (form, optional): Whether the file(s) or folder(s) should be published on save, provided that usage
          rights have been specified (set to `true` to publish on save).
        - usage_rights[use_justification] (form, required): The intellectual property justification for using the files
          in Canvas
        - usage_rights[legal_copyright] (form, optional): The legal copyright line for the files
        - usage_rights[license] (form, optional): The license that applies to the files. See the {api:
          UsageRightsController#licenses List licenses endpoint} for the supported license types.

- **PUT** /v1/groups/{group_id}/usage_rights
    - Description: Set usage rights
    - Parameters:
        - group_id (path, required): ID
        - file_ids (form, required): List of ids of files to set usage rights for.
        - folder_ids (form, optional): List of ids of folders to search for files to set usage rights for.
          Note that new files uploaded to these folders do not automatically inherit these rights.
        - publish (form, optional): Whether the file(s) or folder(s) should be published on save, provided that usage
          rights have been specified (set to `true` to publish on save).
        - usage_rights[use_justification] (form, required): The intellectual property justification for using the files
          in Canvas
        - usage_rights[legal_copyright] (form, optional): The legal copyright line for the files
        - usage_rights[license] (form, optional): The license that applies to the files. See the {api:
          UsageRightsController#licenses List licenses endpoint} for the supported license types.

- **PUT** /v1/users/{user_id}/usage_rights
    - Description: Set usage rights
    - Parameters:
        - user_id (path, required): ID
        - file_ids (form, required): List of ids of files to set usage rights for.
        - folder_ids (form, optional): List of ids of folders to search for files to set usage rights for.
          Note that new files uploaded to these folders do not automatically inherit these rights.
        - publish (form, optional): Whether the file(s) or folder(s) should be published on save, provided that usage
          rights have been specified (set to `true` to publish on save).
        - usage_rights[use_justification] (form, required): The intellectual property justification for using the files
          in Canvas
        - usage_rights[legal_copyright] (form, optional): The legal copyright line for the files
        - usage_rights[license] (form, optional): The license that applies to the files. See the {api:
          UsageRightsController#licenses List licenses endpoint} for the supported license types.

- **DELETE** /v1/courses/{course_id}/usage_rights
    - Description: Remove usage rights
    - Parameters:
        - course_id (path, required): ID
        - file_ids (query, required): List of ids of files to remove associated usage rights from.
        - folder_ids (query, optional): List of ids of folders. Usage rights will be removed from all files in these
          folders.

- **DELETE** /v1/groups/{group_id}/usage_rights
    - Description: Remove usage rights
    - Parameters:
        - group_id (path, required): ID
        - file_ids (query, required): List of ids of files to remove associated usage rights from.
        - folder_ids (query, optional): List of ids of folders. Usage rights will be removed from all files in these
          folders.

- **DELETE** /v1/users/{user_id}/usage_rights
    - Description: Remove usage rights
    - Parameters:
        - user_id (path, required): ID
        - file_ids (query, required): List of ids of files to remove associated usage rights from.
        - folder_ids (query, optional): List of ids of folders. Usage rights will be removed from all files in these
          folders.

- **GET** /v1/courses/{course_id}/content_licenses
    - Description: List licenses
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/content_licenses
    - Description: List licenses
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/users/{user_id}/content_licenses
    - Description: List licenses
    - Parameters:
        - user_id (path, required): ID

### Grade Change Log

Path: `/grade_change_log.json`

- **GET** /v1/audit/grade_change/assignments/{assignment_id}
    - Description: Query by assignment
    - Parameters:
        - assignment_id (path, required): ID
        - start_time (query, optional): The beginning of the time range from which you want events.
        - end_time (query, optional): The end of the time range from which you want events.

- **GET** /v1/audit/grade_change/courses/{course_id}
    - Description: Query by course
    - Parameters:
        - course_id (path, required): ID
        - start_time (query, optional): The beginning of the time range from which you want events.
        - end_time (query, optional): The end of the time range from which you want events.

- **GET** /v1/audit/grade_change/students/{student_id}
    - Description: Query by student
    - Parameters:
        - student_id (path, required): ID
        - start_time (query, optional): The beginning of the time range from which you want events.
        - end_time (query, optional): The end of the time range from which you want events.

- **GET** /v1/audit/grade_change/graders/{grader_id}
    - Description: Query by grader
    - Parameters:
        - grader_id (path, required): ID
        - start_time (query, optional): The beginning of the time range from which you want events.
        - end_time (query, optional): The end of the time range from which you want events.

- **GET** /v1/audit/grade_change
    - Description: Advanced query
    - Parameters:
        - course_id (query, optional): Restrict query to events in the specified course.
        - assignment_id (query, optional): Restrict query to the given assignment. If "override" is given, query the
          course final grade override instead.
        - student_id (query, optional): User id of a student to search grading events for.
        - grader_id (query, optional): User id of a grader to search grading events for.
        - start_time (query, optional): The beginning of the time range from which you want events.
        - end_time (query, optional): The end of the time range from which you want events.

### Gradebook History

Path: `/gradebook_history.json`

- **GET** /v1/courses/{course_id}/gradebook_history/days
    - Description: Days in gradebook history for this course
    - Parameters:
        - course_id (path, required): The id of the contextual course for this API call

- **GET** /v1/courses/{course_id}/gradebook_history/{date}
    - Description: Details for a given date in gradebook history for this course
    - Parameters:
        - course_id (path, required): The id of the contextual course for this API call
        - date (path, required): The date for which you would like to see detailed information

- **GET** /v1/courses/{course_id}/gradebook_history/{date}/graders/{grader_id}/assignments/{assignment_id}/submissions
    - Description: Lists submissions
    - Parameters:
        - course_id (path, required): The id of the contextual course for this API call
        - date (path, required): The date for which you would like to see submissions
        - grader_id (path, required): The ID of the grader for which you want to see submissions
        - assignment_id (path, required): The ID of the assignment for which you want to see submissions

- **GET** /v1/courses/{course_id}/gradebook_history/feed
    - Description: List uncollated submission versions
    - Parameters:
        - course_id (path, required): The id of the contextual course for this API call
        - assignment_id (query, optional): The ID of the assignment for which you want to see submissions. If
          absent, versions of submissions from any assignment in the course are
          included.
        - user_id (query, optional): The ID of the user for which you want to see submissions. If absent,
          versions of submissions from any user in the course are included.
        - ascending (query, optional): Returns submission versions in ascending date order (oldest first). If
          absent, returns submission versions in descending date order (newest
          first).

### Grading Period Sets

Path: `/grading_period_sets.json`

- **GET** /v1/accounts/{account_id}/grading_period_sets
    - Description: List grading period sets
    - Parameters:
        - account_id (path, required): ID

- **POST** /v1/accounts/{account_id}/grading_period_sets
    - Description: Create a grading period set
    - Parameters:
        - account_id (path, required): ID
        - enrollment_term_ids (form, optional): A list of associated term ids for the grading period set
        - grading_period_set[title] (form, required): The title of the grading period set
        - grading_period_set[weighted] (form, optional): A boolean to determine whether the grading periods in the set
          are weighted
        - grading_period_set[display_totals_for_all_grading_periods] (form, optional): A boolean to determine whether
          the totals for all grading periods in the set are displayed

- **PATCH** /v1/accounts/{account_id}/grading_period_sets/{id}
    - Description: Update a grading period set
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - enrollment_term_ids (form, optional): A list of associated term ids for the grading period set
        - grading_period_set[title] (form, required): The title of the grading period set
        - grading_period_set[weighted] (form, optional): A boolean to determine whether the grading periods in the set
          are weighted
        - grading_period_set[display_totals_for_all_grading_periods] (form, optional): A boolean to determine whether
          the totals for all grading periods in the set are displayed

- **DELETE** /v1/accounts/{account_id}/grading_period_sets/{id}
    - Description: Delete a grading period set
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

### Grading Periods

Path: `/grading_periods.json`

- **GET** /v1/accounts/{account_id}/grading_periods
    - Description: List grading periods
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/grading_periods
    - Description: List grading periods
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/grading_periods/{id}
    - Description: Get a single grading period
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/courses/{course_id}/grading_periods/{id}
    - Description: Update a single grading period
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - grading_periods[start_date] (form, required): The date the grading period starts.
        - grading_periods[end_date] (form, required): no description
        - grading_periods[weight] (form, optional): A weight value that contributes to the overall weight of a grading
          period set which is used to calculate how much assignments in this period contribute to the total grade

- **DELETE** /v1/courses/{course_id}/grading_periods/{id}
    - Description: Delete a grading period
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/accounts/{account_id}/grading_periods/{id}
    - Description: Delete a grading period
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **PATCH** /v1/courses/{course_id}/grading_periods/batch_update
    - Description: Batch update grading periods
    - Parameters:
        - course_id (path, required): ID
        - set_id (form, required): The id of the grading period set.
        - grading_periods[id] (form, optional): The id of the grading period. If the id parameter does not exist, a new
          grading period will be created.
        - grading_periods[title] (form, required): The title of the grading period.
          The title is required for creating a new grading period, but not for updating an existing grading period.
        - grading_periods[start_date] (form, required): The date the grading period starts.
          The start_date is required for creating a new grading period, but not for updating an existing grading period.
        - grading_periods[end_date] (form, required): The date the grading period ends.
          The end_date is required for creating a new grading period, but not for updating an existing grading period.
        - grading_periods[close_date] (form, required): The date after which grades can no longer be changed for a
          grading period.
          The close_date is required for creating a new grading period, but not for updating an existing grading period.
        - grading_periods[weight] (form, optional): A weight value that contributes to the overall weight of a grading
          period set which is used to calculate how much assignments in this period contribute to the total grade

- **PATCH** /v1/grading_period_sets/{set_id}/grading_periods/batch_update
    - Description: Batch update grading periods
    - Parameters:
        - set_id (path, required): The id of the grading period set.
        - grading_periods[id] (form, optional): The id of the grading period. If the id parameter does not exist, a new
          grading period will be created.
        - grading_periods[title] (form, required): The title of the grading period.
          The title is required for creating a new grading period, but not for updating an existing grading period.
        - grading_periods[start_date] (form, required): The date the grading period starts.
          The start_date is required for creating a new grading period, but not for updating an existing grading period.
        - grading_periods[end_date] (form, required): The date the grading period ends.
          The end_date is required for creating a new grading period, but not for updating an existing grading period.
        - grading_periods[close_date] (form, required): The date after which grades can no longer be changed for a
          grading period.
          The close_date is required for creating a new grading period, but not for updating an existing grading period.
        - grading_periods[weight] (form, optional): A weight value that contributes to the overall weight of a grading
          period set which is used to calculate how much assignments in this period contribute to the total grade

### Grading Standards

Path: `/grading_standards.json`

- **POST** /v1/accounts/{account_id}/grading_standards
    - Description: Create a new grading standard
    - Parameters:
        - account_id (path, required): ID
        - title (form, required): The title for the Grading Standard.
        - points_based (form, optional): Whether or not a grading scheme is points based.
          Defaults to false.
        - scaling_factor (form, optional): The factor by which to scale a percentage into a points based scheme grade.
          This is the maximum number of points possible in the grading scheme.
          Defaults to 1. Not required for percentage based grading schemes.
        - grading_scheme_entry[name] (form, required): The name for an entry value within a GradingStandard that
          describes the range of the value
          e.g. A-
        - grading_scheme_entry[value] (form, required): The value for the name of the entry within a GradingStandard.
          The entry represents the lower bound of the range for the entry.
          This range includes the value up to the next entry in the GradingStandard,
          or 100 if there is no upper bound. The lowest value will have a lower bound range of 0.
          e.g. 93

- **POST** /v1/courses/{course_id}/grading_standards
    - Description: Create a new grading standard
    - Parameters:
        - course_id (path, required): ID
        - title (form, required): The title for the Grading Standard.
        - points_based (form, optional): Whether or not a grading scheme is points based.
          Defaults to false.
        - scaling_factor (form, optional): The factor by which to scale a percentage into a points based scheme grade.
          This is the maximum number of points possible in the grading scheme.
          Defaults to 1. Not required for percentage based grading schemes.
        - grading_scheme_entry[name] (form, required): The name for an entry value within a GradingStandard that
          describes the range of the value
          e.g. A-
        - grading_scheme_entry[value] (form, required): The value for the name of the entry within a GradingStandard.
          The entry represents the lower bound of the range for the entry.
          This range includes the value up to the next entry in the GradingStandard,
          or 100 if there is no upper bound. The lowest value will have a lower bound range of 0.
          e.g. 93

- **GET** /v1/courses/{course_id}/grading_standards
    - Description: List the grading standards available in a context.
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/accounts/{account_id}/grading_standards
    - Description: List the grading standards available in a context.
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/grading_standards/{grading_standard_id}
    - Description: Get a single grading standard in a context.
    - Parameters:
        - course_id (path, required): ID
        - grading_standard_id (path, required): ID

- **GET** /v1/accounts/{account_id}/grading_standards/{grading_standard_id}
    - Description: Get a single grading standard in a context.
    - Parameters:
        - account_id (path, required): ID
        - grading_standard_id (path, required): ID

### Group Categories

Path: `/group_categories.json`

- **GET** /v1/accounts/{account_id}/group_categories
    - Description: List group categories for a context
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/group_categories
    - Description: List group categories for a context
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/group_categories/{group_category_id}
    - Description: Get a single group category
    - Parameters:
        - group_category_id (path, required): ID

- **POST** /v1/accounts/{account_id}/group_categories
    - Description: Create a Group Category
    - Parameters:
        - account_id (path, required): ID
        - name (form, required): Name of the group category
        - non_collaborative (form, optional): Can only be set by users with the Differentiated Tag Add permission

If set to true, groups in this category will be only be visible to users with the
Differentiated Tag Manage permission.
- self_signup (form, optional): Allow students to sign up for a group themselves (Course Only).
valid values are:
"enabled":: allows students to self sign up for any group in course
"restricted":: allows students to self sign up only for groups in the
same section null disallows self sign up
- auto_leader (form, optional): Assigns group leaders automatically when generating and allocating students to groups
Valid values are:
"first":: the first student to be allocated to a group is the leader
"random":: a random student from all members is chosen as the leader
- group_limit (form, optional): Limit the maximum number of users in each group (Course Only). Requires
self signup.
- sis_group_category_id (form, optional): The unique SIS identifier.
- create_group_count (form, optional): Create this number of groups (Course Only).
- split_group_count (form, optional): (Deprecated)
Create this number of groups, and evenly distribute students
among them. not allowed with "enable_self_signup". because
the group assignment happens synchronously, it's recommended
that you instead use the assign_unassigned_members endpoint.
(Course Only)

- **POST** /v1/courses/{course_id}/group_categories
    - Description: Create a Group Category
    - Parameters:
        - course_id (path, required): ID
        - name (form, required): Name of the group category
        - non_collaborative (form, optional): Can only be set by users with the Differentiated Tag Add permission

If set to true, groups in this category will be only be visible to users with the
Differentiated Tag Manage permission.
- self_signup (form, optional): Allow students to sign up for a group themselves (Course Only).
valid values are:
"enabled":: allows students to self sign up for any group in course
"restricted":: allows students to self sign up only for groups in the
same section null disallows self sign up
- auto_leader (form, optional): Assigns group leaders automatically when generating and allocating students to groups
Valid values are:
"first":: the first student to be allocated to a group is the leader
"random":: a random student from all members is chosen as the leader
- group_limit (form, optional): Limit the maximum number of users in each group (Course Only). Requires
self signup.
- sis_group_category_id (form, optional): The unique SIS identifier.
- create_group_count (form, optional): Create this number of groups (Course Only).
- split_group_count (form, optional): (Deprecated)
Create this number of groups, and evenly distribute students
among them. not allowed with "enable_self_signup". because
the group assignment happens synchronously, it's recommended
that you instead use the assign_unassigned_members endpoint.
(Course Only)

- **POST** /v1/group_categories/{group_category_id}/import
    - Description: Import category groups
    - Parameters:
        - group_category_id (path, required): ID
        - attachment (form, optional): There are two ways to post group category import data - either via a
          multipart/form-data form-field-style attachment, or via a non-multipart
          raw post request.

'attachment' is required for multipart/form-data style posts. Assumed to
be outcome data from a file upload form field named 'attachment'.

Examples:
curl -F attachment=@<filename> -H "Authorization: Bearer <token>" \
'https://<canvas>/api/v1/group_categories/<category_id>/import'

If you decide to do a raw post, you can skip the 'attachment' argument,
but you will then be required to provide a suitable Content-Type header.
You are encouraged to also provide the 'extension' argument.

Examples:
curl -H 'Content-Type: text/csv' --data-binary @<filename>.csv \
-H "Authorization: Bearer <token>" \
'https://<canvas>/api/v1/group_categories/<category_id>/import'

- **PUT** /v1/group_categories/{group_category_id}
    - Description: Update a Group Category
    - Parameters:
        - group_category_id (path, required): ID
        - name (form, optional): Name of the group category
        - self_signup (form, optional): Allow students to sign up for a group themselves (Course Only).
          Valid values are:
          "enabled":: allows students to self sign up for any group in course
          "restricted":: allows students to self sign up only for groups in the
          same section null disallows self sign up
        - auto_leader (form, optional): Assigns group leaders automatically when generating and allocating students to
          groups
          Valid values are:
          "first":: the first student to be allocated to a group is the leader
          "random":: a random student from all members is chosen as the leader
        - group_limit (form, optional): Limit the maximum number of users in each group (Course Only). Requires
          self signup.
        - sis_group_category_id (form, optional): The unique SIS identifier.
        - create_group_count (form, optional): Create this number of groups (Course Only).
        - split_group_count (form, optional): (Deprecated)
          Create this number of groups, and evenly distribute students
          among them. not allowed with "enable_self_signup". because
          the group assignment happens synchronously, it's recommended
          that you instead use the assign_unassigned_members endpoint.
          (Course Only)

- **DELETE** /v1/group_categories/{group_category_id}
    - Description: Delete a Group Category
    - Parameters:
        - group_category_id (path, required): ID

- **GET** /v1/group_categories/{group_category_id}/groups
    - Description: List groups in group category
    - Parameters:
        - group_category_id (path, required): ID

- **GET** /v1/group_categories/{group_category_id}/export
    - Description: export groups in and users in category
    - Parameters:
        - group_category_id (path, required): ID

- **GET** /v1/group_categories/{group_category_id}/users
    - Description: List users in group category
    - Parameters:
        - group_category_id (path, required): ID
        - search_term (query, optional): The partial name or full ID of the users to match and return in the results
          list. Must be at least 3 characters.
        - unassigned (query, optional): Set this value to true if you wish only to search unassigned users in the
          group category.

- **POST** /v1/group_categories/{group_category_id}/assign_unassigned_members
    - Description: Assign unassigned members
    - Parameters:
        - group_category_id (path, required): ID
        - sync (form, optional): The assigning is done asynchronously by default. If you would like to
          override this and have the assigning done synchronously, set this value
          to true.

### Groups

Path: `/groups.json`

- **GET** /v1/users/self/groups
    - Description: List your groups
    - Parameters:
        - context_type (query, optional): Only include groups that are in this type of context.
        - include (query, optional): - "tabs": Include the list of tabs configured for each group. See the
          {api:TabsController#index List available tabs API} for more information.

- **GET** /v1/accounts/{account_id}/groups
    - Description: List the groups available in a context.
    - Parameters:
        - account_id (path, required): ID
        - only_own_groups (query, optional): Will only include groups that the user belongs to if this is set
        - include (query, optional): - "tabs": Include the list of tabs configured for each group. See the
          {api:TabsController#index List available tabs API} for more information.

- **GET** /v1/courses/{course_id}/groups
    - Description: List the groups available in a context.
    - Parameters:
        - course_id (path, required): ID
        - only_own_groups (query, optional): Will only include groups that the user belongs to if this is set
        - include (query, optional): - "tabs": Include the list of tabs configured for each group. See the
          {api:TabsController#index List available tabs API} for more information.

- **GET** /v1/groups/{group_id}
    - Description: Get a single group
    - Parameters:
        - group_id (path, required): ID
        - include (query, optional): - "permissions": Include permissions the current user has
          for the group.
- "tabs": Include the list of tabs configured for each group. See the
  {api:TabsController#index List available tabs API} for more information.

- **POST** /v1/groups
    - Description: Create a group
    - Parameters:
        - name (form, optional): The name of the group
        - description (form, optional): A description of the group
        - is_public (form, optional): whether the group is public (applies only to community groups)
        - join_level (form, optional): no description
        - storage_quota_mb (form, optional): The allowed file storage for the group, in megabytes. This parameter is
          ignored if the caller does not have the manage_storage_quotas permission.
        - sis_group_id (form, optional): The sis ID of the group. Must have manage_sis permission to set.

- **POST** /v1/group_categories/{group_category_id}/groups
    - Description: Create a group
    - Parameters:
        - group_category_id (path, required): ID
        - name (form, optional): The name of the group
        - description (form, optional): A description of the group
        - is_public (form, optional): whether the group is public (applies only to community groups)
        - join_level (form, optional): no description
        - storage_quota_mb (form, optional): The allowed file storage for the group, in megabytes. This parameter is
          ignored if the caller does not have the manage_storage_quotas permission.
        - sis_group_id (form, optional): The sis ID of the group. Must have manage_sis permission to set.

- **PUT** /v1/groups/{group_id}
    - Description: Edit a group
    - Parameters:
        - group_id (path, required): ID
        - name (form, optional): The name of the group
        - description (form, optional): A description of the group
        - is_public (form, optional): Whether the group is public (applies only to community groups). Currently
          you cannot set a group back to private once it has been made public.
        - join_level (form, optional): no description
        - avatar_id (form, optional): The id of the attachment previously uploaded to the group that you would
          like to use as the avatar image for this group.
        - storage_quota_mb (form, optional): The allowed file storage for the group, in megabytes. This parameter is
          ignored if the caller does not have the manage_storage_quotas permission.
        - members (form, optional): An array of user ids for users you would like in the group.
          Users not in the group will be sent invitations. Existing group
          members who aren't in the list will be removed from the group.
        - sis_group_id (form, optional): The sis ID of the group. Must have manage_sis permission to set.
        - override_sis_stickiness (form, optional): Default is true. If false, any fields containing “sticky” changes
          will not be updated.
          See SIS CSV Format documentation for information on which fields can have SIS stickiness

- **DELETE** /v1/groups/{group_id}
    - Description: Delete a group
    - Parameters:
        - group_id (path, required): ID

- **POST** /v1/groups/{group_id}/invite
    - Description: Invite others to a group
    - Parameters:
        - group_id (path, required): ID
        - invitees (form, required): An array of email addresses to be sent invitations.

- **GET** /v1/groups/{group_id}/users
    - Description: List group's users
    - Parameters:
        - group_id (path, required): ID
        - search_term (query, optional): The partial name or full ID of the users to match and return in the
          results list. Must be at least 3 characters.
        - include (query, optional): "avatar_url": Include users' avatar_urls.
        - exclude_inactive (query, optional): Whether to filter out inactive users from the results. Defaults to
          false unless explicitly provided.

- **POST** /v1/groups/{group_id}/files
    - Description: Upload a file
    - Parameters:
        - group_id (path, required): ID

- **POST** /v1/groups/{group_id}/preview_html
    - Description: Preview processed html
    - Parameters:
        - group_id (path, required): ID
        - html (form, optional): The html content to process

- **GET** /v1/groups/{group_id}/activity_stream
    - Description: Group activity stream
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/groups/{group_id}/activity_stream/summary
    - Description: Group activity stream summary
    - Parameters:
        - group_id (path, required): ID

- **GET** /v1/groups/{group_id}/permissions
    - Description: Permissions
    - Parameters:
        - group_id (path, required): ID
        - permissions (query, optional): List of permissions to check against the authenticated user.
          Permission names are documented in the {api:RoleOverridesController#add_role Create a role} endpoint.

- **GET** /v1/groups/{group_id}/memberships
    - Description: List group memberships
    - Parameters:
        - group_id (path, required): ID
        - filter_states (query, optional): Only list memberships with the given workflow_states. By default it will
          return all memberships.

- **GET** /v1/groups/{group_id}/memberships/{membership_id}
    - Description: Get a single group membership
    - Parameters:
        - group_id (path, required): ID
        - membership_id (path, required): ID

- **GET** /v1/groups/{group_id}/users/{user_id}
    - Description: Get a single group membership
    - Parameters:
        - group_id (path, required): ID
        - user_id (path, required): ID

- **POST** /v1/groups/{group_id}/memberships
    - Description: Create a membership
    - Parameters:
        - group_id (path, required): ID
        - user_id (form, optional): no description

- **PUT** /v1/groups/{group_id}/memberships/{membership_id}
    - Description: Update a membership
    - Parameters:
        - group_id (path, required): ID
        - membership_id (path, required): ID
        - workflow_state (form, optional): Currently, the only allowed value is "accepted"
        - moderator (form, optional): no description

- **PUT** /v1/groups/{group_id}/users/{user_id}
    - Description: Update a membership
    - Parameters:
        - group_id (path, required): ID
        - user_id (path, required): ID
        - workflow_state (form, optional): Currently, the only allowed value is "accepted"
        - moderator (form, optional): no description

- **DELETE** /v1/groups/{group_id}/memberships/{membership_id}
    - Description: Leave a group
    - Parameters:
        - group_id (path, required): ID
        - membership_id (path, required): ID

- **DELETE** /v1/groups/{group_id}/users/{user_id}
    - Description: Leave a group
    - Parameters:
        - group_id (path, required): ID
        - user_id (path, required): ID

### History

Path: `/history.json`

- **GET** /v1/users/{user_id}/history
    - Description: List recent history for a user
    - Parameters:
        - user_id (path, required): ID

### InstAccess tokens

Path: `/inst_access_tokens.json`

- **POST** /v1/inst_access_tokens
    - Description: Create InstAccess token

### JWTs

Path: `/jw_ts.json`

- **POST** /v1/jwts
    - Description: Create JWT
    - Parameters:
        - workflows (form, optional): Adds additional data to the JWT to be used by the consuming service workflow
        - context_type (form, optional): The type of the context in case a specified workflow uses it to consuming the
          service. Case insensitive.
        - context_id (form, optional): The id of the context in case a specified workflow uses it to consuming the
          service.
        - context_uuid (form, optional): The uuid of the context in case a specified workflow uses it to consuming the
          service.
        - canvas_audience (form, optional): Defaults to true. If false, the JWT will be signed, but not encrypted, for
          use in downstream services. The
          default encrypted behaviour can be used to talk to canvas itself.

- **POST** /v1/jwts/refresh
    - Description: Refresh JWT
    - Parameters:
        - jwt (form, required): An existing JWT token to be refreshed. The new token will have
          the same context and workflows as the existing token.

### Late Policy

Path: `/late_policy.json`

- **GET** /v1/courses/{id}/late_policy
    - Description: Get a late policy
    - Parameters:
        - id (path, required): ID

- **POST** /v1/courses/{id}/late_policy
    - Description: Create a late policy
    - Parameters:
        - id (path, required): ID
        - late_policy[missing_submission_deduction_enabled] (form, optional): Whether to enable the missing submission
          deduction late policy.
        - late_policy[missing_submission_deduction] (form, optional): How many percentage points to deduct from a
          missing submission.
        - late_policy[late_submission_deduction_enabled] (form, optional): Whether to enable the late submission
          deduction late policy.
        - late_policy[late_submission_deduction] (form, optional): How many percentage points to deduct per the late
          submission interval.
        - late_policy[late_submission_interval] (form, optional): The interval for late policies.
        - late_policy[late_submission_minimum_percent_enabled] (form, optional): Whether to enable the late submission
          minimum percent for a late policy.
        - late_policy[late_submission_minimum_percent] (form, optional): The minimum grade a submissions can have in
          percentage points.

- **PATCH** /v1/courses/{id}/late_policy
    - Description: Patch a late policy
    - Parameters:
        - id (path, required): ID
        - late_policy[missing_submission_deduction_enabled] (form, optional): Whether to enable the missing submission
          deduction late policy.
        - late_policy[missing_submission_deduction] (form, optional): How many percentage points to deduct from a
          missing submission.
        - late_policy[late_submission_deduction_enabled] (form, optional): Whether to enable the late submission
          deduction late policy.
        - late_policy[late_submission_deduction] (form, optional): How many percentage points to deduct per the late
          submission interval.
        - late_policy[late_submission_interval] (form, optional): The interval for late policies.
        - late_policy[late_submission_minimum_percent_enabled] (form, optional): Whether to enable the late submission
          minimum percent for a late policy.
        - late_policy[late_submission_minimum_percent] (form, optional): The minimum grade a submissions can have in
          percentage points.

### Learning Object Dates

Path: `/learning_object_dates.json`

- **GET** /v1/courses/{course_id}/modules/{context_module_id}/date_details
    - Description: Get a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - context_module_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/date_details
    - Description: Get a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/date_details
    - Description: Get a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID

- **GET** /v1/courses/{course_id}/discussion_topics/{discussion_topic_id}/date_details
    - Description: Get a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - discussion_topic_id (path, required): ID

- **GET** /v1/courses/{course_id}/pages/{url_or_id}/date_details
    - Description: Get a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - url_or_id (path, required): ID

- **GET** /v1/courses/{course_id}/files/{attachment_id}/date_details
    - Description: Get a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - attachment_id (path, required): ID

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/date_details
    - Description: Update a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - due_at (form, optional): The learning object's due date. Not applicable for ungraded discussions, pages, and
          files.
        - unlock_at (form, optional): The learning object's unlock date. Must be before the due date if there is one.
        - lock_at (form, optional): The learning object's lock date. Must be after the due date if there is one.
        - only_visible_to_overrides (form, optional): Whether the learning object is only assigned to students who are
          targeted by an override.
        - assignment_overrides (form, optional): List of overrides to apply to the learning object. Overrides that
          already exist should include
          an ID and will be updated if needed. New overrides will be created for overrides in the list
          without an ID. Overrides not included in the list will be deleted. Providing an empty list
          will delete all of the object's overrides. Keys for each override object can include: 'id',
          'title', 'due_at', 'unlock_at', 'lock_at', 'student_ids', and 'course_section_id', 'course_id',
          'noop_id', and 'unassign_item'.

- **PUT** /v1/courses/{course_id}/quizzes/{quiz_id}/date_details
    - Description: Update a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - due_at (form, optional): The learning object's due date. Not applicable for ungraded discussions, pages, and
          files.
        - unlock_at (form, optional): The learning object's unlock date. Must be before the due date if there is one.
        - lock_at (form, optional): The learning object's lock date. Must be after the due date if there is one.
        - only_visible_to_overrides (form, optional): Whether the learning object is only assigned to students who are
          targeted by an override.
        - assignment_overrides (form, optional): List of overrides to apply to the learning object. Overrides that
          already exist should include
          an ID and will be updated if needed. New overrides will be created for overrides in the list
          without an ID. Overrides not included in the list will be deleted. Providing an empty list
          will delete all of the object's overrides. Keys for each override object can include: 'id',
          'title', 'due_at', 'unlock_at', 'lock_at', 'student_ids', and 'course_section_id', 'course_id',
          'noop_id', and 'unassign_item'.

- **PUT** /v1/courses/{course_id}/discussion_topics/{discussion_topic_id}/date_details
    - Description: Update a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - discussion_topic_id (path, required): ID
        - due_at (form, optional): The learning object's due date. Not applicable for ungraded discussions, pages, and
          files.
        - unlock_at (form, optional): The learning object's unlock date. Must be before the due date if there is one.
        - lock_at (form, optional): The learning object's lock date. Must be after the due date if there is one.
        - only_visible_to_overrides (form, optional): Whether the learning object is only assigned to students who are
          targeted by an override.
        - assignment_overrides (form, optional): List of overrides to apply to the learning object. Overrides that
          already exist should include
          an ID and will be updated if needed. New overrides will be created for overrides in the list
          without an ID. Overrides not included in the list will be deleted. Providing an empty list
          will delete all of the object's overrides. Keys for each override object can include: 'id',
          'title', 'due_at', 'unlock_at', 'lock_at', 'student_ids', and 'course_section_id', 'course_id',
          'noop_id', and 'unassign_item'.

- **PUT** /v1/courses/{course_id}/pages/{url_or_id}/date_details
    - Description: Update a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - url_or_id (path, required): ID
        - due_at (form, optional): The learning object's due date. Not applicable for ungraded discussions, pages, and
          files.
        - unlock_at (form, optional): The learning object's unlock date. Must be before the due date if there is one.
        - lock_at (form, optional): The learning object's lock date. Must be after the due date if there is one.
        - only_visible_to_overrides (form, optional): Whether the learning object is only assigned to students who are
          targeted by an override.
        - assignment_overrides (form, optional): List of overrides to apply to the learning object. Overrides that
          already exist should include
          an ID and will be updated if needed. New overrides will be created for overrides in the list
          without an ID. Overrides not included in the list will be deleted. Providing an empty list
          will delete all of the object's overrides. Keys for each override object can include: 'id',
          'title', 'due_at', 'unlock_at', 'lock_at', 'student_ids', and 'course_section_id', 'course_id',
          'noop_id', and 'unassign_item'.

- **PUT** /v1/courses/{course_id}/files/{attachment_id}/date_details
    - Description: Update a learning object's date information
    - Parameters:
        - course_id (path, required): ID
        - attachment_id (path, required): ID
        - due_at (form, optional): The learning object's due date. Not applicable for ungraded discussions, pages, and
          files.
        - unlock_at (form, optional): The learning object's unlock date. Must be before the due date if there is one.
        - lock_at (form, optional): The learning object's lock date. Must be after the due date if there is one.
        - only_visible_to_overrides (form, optional): Whether the learning object is only assigned to students who are
          targeted by an override.
        - assignment_overrides (form, optional): List of overrides to apply to the learning object. Overrides that
          already exist should include
          an ID and will be updated if needed. New overrides will be created for overrides in the list
          without an ID. Overrides not included in the list will be deleted. Providing an empty list
          will delete all of the object's overrides. Keys for each override object can include: 'id',
          'title', 'due_at', 'unlock_at', 'lock_at', 'student_ids', and 'course_section_id', 'course_id',
          'noop_id', and 'unassign_item'.

### Line Items

Path: `/line_items.json`

- **POST** /lti/courses/{course_id}/line_items
    - Description: Create a Line Item
    - Parameters:
        - course_id (path, required): ID
        - scoreMaximum (form, required): The maximum score for the line item. Scores created for the Line Item may
          exceed this value.
        - label (form, required): The label for the Line Item. If no resourceLinkId is specified this value will also be
          used
          as the name of the placeholder assignment.
        - resourceId (form, optional): A Tool Provider specified id for the Line Item. Multiple line items may
          share the same resourceId within a given context.
        - tag (form, optional): A value used to qualify a line Item beyond its ids. Line Items may be queried
          by this value in the List endpoint. Multiple line items can share the same tag
          within a given context.
        - resourceLinkId (form, optional): The resource link id the Line Item should be attached to. This value should
          match the LTI id of the Canvas assignment associated with the tool.
        - startDateTime (form, optional): The ISO8601 date and time when the line item is made available. Corresponds
          to the assignment's unlock_at date.
        - endDateTime (form, optional): The ISO8601 date and time when the line item stops receiving submissions.
          Corresponds
          to the assignment's due_at date.
        - https://canvas.instructure.com/lti/submission_type (form, optional): (EXTENSION) - Optional block to set
          Assignment Submission Type when creating a new assignment is created.
          type - 'none' or 'external_tool'::
          external_tool_url - Submission URL only used when type: 'external_tool'::

- **PUT** /lti/courses/{course_id}/line_items/{id}
    - Description: Update a Line Item
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - scoreMaximum (form, optional): The maximum score for the line item. Scores created for the Line Item may
          exceed this value.
        - label (form, optional): The label for the Line Item. If no resourceLinkId is specified this value will also be
          used
          as the name of the placeholder assignment.
        - resourceId (form, optional): A Tool Provider specified id for the Line Item. Multiple line items may
          share the same resourceId within a given context.
        - tag (form, optional): A value used to qualify a line Item beyond its ids. Line Items may be queried
          by this value in the List endpoint. Multiple line items can share the same tag
          within a given context.
        - startDateTime (form, optional): The ISO8601 date and time when the line item is made available. Corresponds
          to the assignment's unlock_at date.
        - endDateTime (form, optional): The ISO8601 date and time when the line item stops receiving submissions.
          Corresponds
          to the assignment's due_at date.

- **GET** /lti/courses/{course_id}/line_items/{id}
    - Description: Show a Line Item
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): Array of additional information to include.

"launch_url":: includes the launch URL for this line item using the "https\://canvas.instructure.com/lti/launch_url"
extension

- **GET** /lti/courses/{course_id}/line_items
    - Description: List line Items
    - Parameters:
        - course_id (path, required): ID
        - tag (query, optional): If specified only Line Items with this tag will be included.
        - resource_id (query, optional): If specified only Line Items with this resource_id will be included.
        - resource_link_id (query, optional): If specified only Line Items attached to the specified resource_link_id
          will be included.
        - limit (query, optional): May be used to limit the number of Line Items returned in a page
        - include (query, optional): Array of additional information to include.

"launch_url":: includes the launch URL for each line item using the "https\://canvas.instructure.com/lti/launch_url"
extension

- **DELETE** /lti/courses/{course_id}/line_items/{id}
    - Description: Delete a Line Item
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

### LiveAssessments

Path: `/live_assessments.json`

- **POST** /v1/courses/{course_id}/live_assessments/{assessment_id}/results
    - Description: Create live assessment results
    - Parameters:
        - course_id (path, required): ID
        - assessment_id (path, required): ID

- **GET** /v1/courses/{course_id}/live_assessments/{assessment_id}/results
    - Description: List live assessment results
    - Parameters:
        - course_id (path, required): ID
        - assessment_id (path, required): ID
        - user_id (query, optional): If set, restrict results to those for this user

- **POST** /v1/courses/{course_id}/live_assessments
    - Description: Create or find a live assessment
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/live_assessments
    - Description: List live assessments
    - Parameters:
        - course_id (path, required): ID

### Logins

Path: `/logins.json`

- **GET** /v1/accounts/{account_id}/logins
    - Description: List user logins
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/users/{user_id}/logins
    - Description: List user logins
    - Parameters:
        - user_id (path, required): ID

- **POST** /v1/users/reset_password
    - Description: Kickoff password recovery flow

- **POST** /v1/accounts/{account_id}/logins
    - Description: Create a user login
    - Parameters:
        - account_id (path, required): ID
        - user[id] (form, required): The ID of the user to create the login for.
        - login[unique_id] (form, required): The unique ID for the new login.
        - login[password] (form, optional): The new login's password.
        - login[sis_user_id] (form, optional): SIS ID for the login. To set this parameter, the caller must be able to
          manage SIS permissions on the account.
        - login[integration_id] (form, optional): Integration ID for the login. To set this parameter, the caller must
          be able to
          manage SIS permissions on the account. The Integration ID is a secondary
          identifier useful for more complex SIS integrations.
        - login[authentication_provider_id] (form, optional): The authentication provider this login is associated with.
          Logins
          associated with a specific provider can only be used with that provider.
          Legacy providers (LDAP, CAS, SAML) will search for logins associated with
          them, or unassociated logins. New providers will only search for logins
          explicitly associated with them. This can be the integer ID of the
          provider, or the type of the provider (in which case, it will find the
          first matching provider).
        - login[declared_user_type] (form, optional): The declared intention of the user type. This can be set, but does
          not change any Canvas functionality with respect to their access.
          A user can still be a teacher, admin, student, etc. in any particular
          context without regard to this setting. This can be used for
          administrative purposes for integrations to be able to more easily
          identify why the user was created.
          Valid values are:

    * administrative
    * observer
    * staff
    * student
    * student_other
    * teacher
        - user[existing_user_id] (form, optional): A Canvas User ID to identify a user in a trusted account (alternative
          to `id`,
          `existing_sis_user_id`, or `existing_integration_id`). This parameter is
          not available in OSS Canvas.
        - user[existing_integration_id] (form, optional): An Integration ID to identify a user in a trusted account (
          alternative to `id`,
          `existing_user_id`, or `existing_sis_user_id`). This parameter is not
          available in OSS Canvas.
        - user[existing_sis_user_id] (form, optional): An SIS User ID to identify a user in a trusted account (
          alternative to `id`,
          `existing_integration_id`, or `existing_user_id`). This parameter is not
          available in OSS Canvas.
        - user[trusted_account] (form, optional): The domain of the account to search for the user. This field is
          required when
          identifying a user in a trusted account. This parameter is not available in OSS
          Canvas.

- **PUT** /v1/accounts/{account_id}/logins/{id}
    - Description: Edit a user login
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - login[unique_id] (form, optional): The new unique ID for the login.
        - login[password] (form, optional): The new password for the login. Can only be set by an admin user if admins
          are allowed to change passwords for the account.
        - login[sis_user_id] (form, optional): SIS ID for the login. To set this parameter, the caller must be able to
          manage SIS permissions on the account.
        - login[integration_id] (form, optional): Integration ID for the login. To set this parameter, the caller must
          be able to
          manage SIS permissions on the account. The Integration ID is a secondary
          identifier useful for more complex SIS integrations.
        - login[authentication_provider_id] (form, optional): The authentication provider this login is associated with.
          Logins
          associated with a specific provider can only be used with that provider.
          Legacy providers (LDAP, CAS, SAML) will search for logins associated with
          them, or unassociated logins. New providers will only search for logins
          explicitly associated with them. This can be the integer ID of the
          provider, or the type of the provider (in which case, it will find the
          first matching provider).
        - login[workflow_state] (form, optional): Used to suspend or re-activate a login.
        - login[declared_user_type] (form, optional): The declared intention of the user type. This can be set, but does
          not change any Canvas functionality with respect to their access.
          A user can still be a teacher, admin, student, etc. in any particular
          context without regard to this setting. This can be used for
          administrative purposes for integrations to be able to more easily
          identify why the user was created.
          Valid values are:

    * administrative
    * observer
    * staff
    * student
    * student_other
    * teacher
        - override_sis_stickiness (form, optional): Default is true. If false, any fields containing “sticky” changes
          will not be updated.
          See SIS CSV Format documentation for information on which fields can have SIS stickiness

- **DELETE** /v1/users/{user_id}/logins/{id}
    - Description: Delete a user login
    - Parameters:
        - user_id (path, required): ID
        - id (path, required): ID

### LTI Resource Links

Path: `/lti_resource_links.json`

- **GET** /v1/courses/{course_id}/lti_resource_links
    - Description: List LTI Resource Links
    - Parameters:
        - course_id (path, required): ID
        - include_deleted (query, optional): Include deleted resource links and links associated with deleted content in
          response. Default is false.
        - per_page (query, optional): The number of registrations to return per page. Defaults to 50.

- **GET** /v1/courses/{course_id}/lti_resource_links/{id}
    - Description: Show an LTI Resource Link
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - include_deleted (query, optional): Include deleted resource links in search. Default is false.

- **POST** /v1/courses/{course_id}/lti_resource_links
    - Description: Create an LTI Resource Link
    - Parameters:
        - course_id (path, required): ID
        - url (form, required): The launch URL for this resource link.
        - title (form, optional): The title of the resource link.
        - custom (form, optional): Custom parameters to be sent to the tool when launching this link.

- **POST** /v1/courses/{course_id}/lti_resource_links/bulk
    - Description: Bulk Create LTI Resource Links
    - Parameters:
        - course_id (path, required): ID
        - POST (form, optional): body [Required, Array] The POST body should be a JSON array of objects containing the
          parameters for each link to create.
        - url (form, required): Each object must contain a launch URL.
        - title (form, optional): Each object may contain a title.
        - custom (form, optional): Custom parameters to be sent to the tool when launching this link.

- **PUT** /v1/courses/{course_id}/lti_resource_links/{id}
    - Description: Update an LTI Resource Link
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - url (form, optional): The launch URL for this resource link.
          <b>Caution!</b> Updating this to a URL that doesn't match the tool could result in errors when launching this
          link!
        - custom (form, optional): Custom parameters to be sent to the tool when launching this link.
          <b>Caution!</b> Changing these from what the tool provided could result in errors if the tool doesn't see what
          it's expecting.
        - include_deleted (form, optional): Update link even if it is deleted. Default is false.

- **DELETE** /v1/courses/{course_id}/lti_resource_links/{id}
    - Description: Delete an LTI Resource Link
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

### Media Objects

Path: `/media_objects.json`

- **GET** /v1/media_objects/{media_object_id}/media_tracks
    - Description: List media tracks for a Media Object or Attachment
    - Parameters:
        - media_object_id (path, required): ID
        - include (query, optional): By default, index returns id, locale, kind, media_object_id, and user_id for each
          of the
          result MediaTracks. Use include[] to
          add additional fields. For example include[]=content

- **GET** /v1/media_attachments/{attachment_id}/media_tracks
    - Description: List media tracks for a Media Object or Attachment
    - Parameters:
        - attachment_id (path, required): ID
        - include (query, optional): By default, index returns id, locale, kind, media_object_id, and user_id for each
          of the
          result MediaTracks. Use include[] to
          add additional fields. For example include[]=content

- **PUT** /v1/media_objects/{media_object_id}/media_tracks
    - Description: Update Media Tracks
    - Parameters:
        - media_object_id (path, required): ID
        - include (form, optional): By default, an update returns id, locale, kind, media_object_id, and user_id for
          each of the
          result MediaTracks. Use include[] to
          add additional fields. For example include[]=content

- **PUT** /v1/media_attachments/{attachment_id}/media_tracks
    - Description: Update Media Tracks
    - Parameters:
        - attachment_id (path, required): ID
        - include (form, optional): By default, an update returns id, locale, kind, media_object_id, and user_id for
          each of the
          result MediaTracks. Use include[] to
          add additional fields. For example include[]=content

- **GET** /v1/media_objects
    - Description: List Media Objects
    - Parameters:
        - sort (query, optional): Field to sort on. Default is "title"

title:: sorts on user_entered_title if available, title if not.

created_at:: sorts on the object's creation time.
- order (query, optional): Sort direction. Default is "asc"
- exclude (query, optional): Array of data to exclude. By excluding "sources" and "tracks",
the api will not need to query kaltura, which greatly
speeds up its response.

sources:: Do not query kaltura for media_sources
tracks:: Do not query kaltura for media_tracks

- **GET** /v1/courses/{course_id}/media_objects
    - Description: List Media Objects
    - Parameters:
        - course_id (path, required): ID
        - sort (query, optional): Field to sort on. Default is "title"

title:: sorts on user_entered_title if available, title if not.

created_at:: sorts on the object's creation time.
- order (query, optional): Sort direction. Default is "asc"
- exclude (query, optional): Array of data to exclude. By excluding "sources" and "tracks",
the api will not need to query kaltura, which greatly
speeds up its response.

sources:: Do not query kaltura for media_sources
tracks:: Do not query kaltura for media_tracks

- **GET** /v1/groups/{group_id}/media_objects
    - Description: List Media Objects
    - Parameters:
        - group_id (path, required): ID
        - sort (query, optional): Field to sort on. Default is "title"

title:: sorts on user_entered_title if available, title if not.

created_at:: sorts on the object's creation time.
- order (query, optional): Sort direction. Default is "asc"
- exclude (query, optional): Array of data to exclude. By excluding "sources" and "tracks",
the api will not need to query kaltura, which greatly
speeds up its response.

sources:: Do not query kaltura for media_sources
tracks:: Do not query kaltura for media_tracks

- **GET** /v1/media_attachments
    - Description: List Media Objects
    - Parameters:
        - sort (query, optional): Field to sort on. Default is "title"

title:: sorts on user_entered_title if available, title if not.

created_at:: sorts on the object's creation time.
- order (query, optional): Sort direction. Default is "asc"
- exclude (query, optional): Array of data to exclude. By excluding "sources" and "tracks",
the api will not need to query kaltura, which greatly
speeds up its response.

sources:: Do not query kaltura for media_sources
tracks:: Do not query kaltura for media_tracks

- **GET** /v1/courses/{course_id}/media_attachments
    - Description: List Media Objects
    - Parameters:
        - course_id (path, required): ID
        - sort (query, optional): Field to sort on. Default is "title"

title:: sorts on user_entered_title if available, title if not.

created_at:: sorts on the object's creation time.
- order (query, optional): Sort direction. Default is "asc"
- exclude (query, optional): Array of data to exclude. By excluding "sources" and "tracks",
the api will not need to query kaltura, which greatly
speeds up its response.

sources:: Do not query kaltura for media_sources
tracks:: Do not query kaltura for media_tracks

- **GET** /v1/groups/{group_id}/media_attachments
    - Description: List Media Objects
    - Parameters:
        - group_id (path, required): ID
        - sort (query, optional): Field to sort on. Default is "title"

title:: sorts on user_entered_title if available, title if not.

created_at:: sorts on the object's creation time.
- order (query, optional): Sort direction. Default is "asc"
- exclude (query, optional): Array of data to exclude. By excluding "sources" and "tracks",
the api will not need to query kaltura, which greatly
speeds up its response.

sources:: Do not query kaltura for media_sources
tracks:: Do not query kaltura for media_tracks

- **PUT** /v1/media_objects/{media_object_id}
    - Description: Update Media Object
    - Parameters:
        - media_object_id (path, required): ID
        - user_entered_title (form, optional): The new title.

- **PUT** /v1/media_attachments/{attachment_id}
    - Description: Update Media Object
    - Parameters:
        - attachment_id (path, required): ID
        - user_entered_title (form, optional): The new title.

### Moderated Grading

Path: `/moderated_grading.json`

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/moderated_students
    - Description: List students selected for moderation
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID

- **POST** /v1/courses/{course_id}/assignments/{assignment_id}/moderated_students
    - Description: Select students for moderation
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - student_ids (form, optional): user ids for students to select for moderation

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/provisional_grades/bulk_select
    - Description: Bulk select provisional grades
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/provisional_grades/status
    - Description: Show provisional grade status for a student
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - student_id (query, optional): The id of the student to show the status for

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/provisional_grades/{provisional_grade_id}/select
    - Description: Select provisional grade
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - provisional_grade_id (path, required): ID

- **POST** /v1/courses/{course_id}/assignments/{assignment_id}/provisional_grades/publish
    - Description: Publish provisional grades for an assignment
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/anonymous_provisional_grades/status
    - Description: Show provisional grade status for a student
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - anonymous_id (query, optional): The id of the student to show the status for

### Modules

Path: `/modules.json`

- **GET** /v1/courses/{course_id}/modules
    - Description: List modules
    - Parameters:
        - course_id (path, required): ID
        - include (query, optional): - "items": Return module items inline if possible.
          This parameter suggests that Canvas return module items directly
          in the Module object JSON, to avoid having to make separate API
          requests for each module when enumerating modules and items. Canvas
          is free to omit 'items' for any particular module if it deems them
          too numerous to return inline. Callers must be prepared to use the
          {api:ContextModuleItemsApiController#index List Module Items API}
          if items are not returned.
- "content_details": Requires 'items'. Returns additional
  details with module items specific to their associated content items.
  Includes standard lock information for each item.
    - search_term (query, optional): The partial name of the modules (and module items, if 'items' is
      specified with include[]) to match and return.
    - student_id (query, optional): Returns module completion information for the student with this id.

- **GET** /v1/courses/{course_id}/modules/{id}
    - Description: Show module
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): - "items": Return module items inline if possible.
          This parameter suggests that Canvas return module items directly
          in the Module object JSON, to avoid having to make separate API
          requests for each module when enumerating modules and items. Canvas
          is free to omit 'items' for any particular module if it deems them
          too numerous to return inline. Callers must be prepared to use the
          {api:ContextModuleItemsApiController#index List Module Items API}
          if items are not returned.
- "content_details": Requires 'items'. Returns additional
  details with module items specific to their associated content items.
  Includes standard lock information for each item.
    - student_id (query, optional): Returns module completion information for the student with this id.

- **POST** /v1/courses/{course_id}/modules
    - Description: Create a module
    - Parameters:
        - course_id (path, required): ID
        - module[name] (form, required): The name of the module
        - module[unlock_at] (form, optional): The date the module will unlock
        - module[position] (form, optional): The position of this module in the course (1-based)
        - module[require_sequential_progress] (form, optional): Whether module items must be unlocked in order
        - module[prerequisite_module_ids] (form, optional): IDs of Modules that must be completed before this one is
          unlocked.
          Prerequisite modules must precede this module (i.e. have a lower position
          value), otherwise they will be ignored
        - module[publish_final_grade] (form, optional): Whether to publish the student's final grade for the course upon
          completion of this module.

- **PUT** /v1/courses/{course_id}/modules/{id}
    - Description: Update a module
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - module[name] (form, optional): The name of the module
        - module[unlock_at] (form, optional): The date the module will unlock
        - module[position] (form, optional): The position of the module in the course (1-based)
        - module[require_sequential_progress] (form, optional): Whether module items must be unlocked in order
        - module[prerequisite_module_ids] (form, optional): IDs of Modules that must be completed before this one is
          unlocked
          Prerequisite modules must precede this module (i.e. have a lower position
          value), otherwise they will be ignored
        - module[publish_final_grade] (form, optional): Whether to publish the student's final grade for the course upon
          completion of this module.
        - module[published] (form, optional): Whether the module is published and visible to students

- **DELETE** /v1/courses/{course_id}/modules/{id}
    - Description: Delete module
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/courses/{course_id}/modules/{id}/relock
    - Description: Re-lock module progressions
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/modules/{module_id}/items
    - Description: List module items
    - Parameters:
        - course_id (path, required): ID
        - module_id (path, required): ID
        - include (query, optional): If included, will return additional details specific to the content
          associated with each item. Refer to the {api:Modules:Module%20Item Module
          Item specification} for more details.
          Includes standard lock information for each item.
        - search_term (query, optional): The partial title of the items to match and return.
        - student_id (query, optional): Returns module completion information for the student with this id.

- **GET** /v1/courses/{course_id}/modules/{module_id}/items/{id}
    - Description: Show module item
    - Parameters:
        - course_id (path, required): ID
        - module_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): If included, will return additional details specific to the content
          associated with this item. Refer to the {api:Modules:Module%20Item Module
          Item specification} for more details.
          Includes standard lock information for each item.
        - student_id (query, optional): Returns module completion information for the student with this id.

- **POST** /v1/courses/{course_id}/modules/{module_id}/items
    - Description: Create a module item
    - Parameters:
        - course_id (path, required): ID
        - module_id (path, required): ID
        - module_item[title] (form, optional): The name of the module item and associated content
        - module_item[type] (form, required): The type of content linked to the item
        - module_item[content_id] (form, required): The id of the content to link to the module item. Required, except
          for
          'ExternalUrl', 'Page', and 'SubHeader' types.
        - module_item[position] (form, optional): The position of this item in the module (1-based).
        - module_item[indent] (form, optional): 0-based indent level; module items may be indented to show a hierarchy
        - module_item[page_url] (form, optional): Suffix for the linked wiki page (e.g. 'front-page'). Required for '
          Page'
          type.
        - module_item[external_url] (form, optional): External url that the item points to. [Required for 'ExternalUrl'
          and
          'ExternalTool' types.
        - module_item[new_tab] (form, optional): Whether the external tool opens in a new tab. Only applies to
          'ExternalTool' type.
        - module_item[completion_requirement][type] (form, optional): Completion requirement for this module item.
          "must_view": Applies to all item types
          "must_contribute": Only applies to "Assignment", "Discussion", and "Page" types
          "must_submit", "min_score": Only apply to "Assignment" and "Quiz" types
          "must_mark_done": Only applies to "Assignment" and "Page" types
          Inapplicable types will be ignored
        - module_item[completion_requirement][min_score] (form, optional): Minimum score required to complete. Required
          for completion_requirement
          type 'min_score'.
        - module_item[iframe][width] (form, optional): Width of the ExternalTool on launch
        - module_item[iframe][height] (form, optional): Height of the ExternalTool on launch

- **PUT** /v1/courses/{course_id}/modules/{module_id}/items/{id}
    - Description: Update a module item
    - Parameters:
        - course_id (path, required): ID
        - module_id (path, required): ID
        - id (path, required): ID
        - module_item[title] (form, optional): The name of the module item
        - module_item[position] (form, optional): The position of this item in the module (1-based)
        - module_item[indent] (form, optional): 0-based indent level; module items may be indented to show a hierarchy
        - module_item[external_url] (form, optional): External url that the item points to. Only applies to '
          ExternalUrl' type.
        - module_item[new_tab] (form, optional): Whether the external tool opens in a new tab. Only applies to
          'ExternalTool' type.
        - module_item[completion_requirement][type] (form, optional): Completion requirement for this module item.
          "must_view": Applies to all item types
          "must_contribute": Only applies to "Assignment", "Discussion", and "Page" types
          "must_submit", "min_score": Only apply to "Assignment" and "Quiz" types
          "must_mark_done": Only applies to "Assignment" and "Page" types
          Inapplicable types will be ignored
        - module_item[completion_requirement][min_score] (form, optional): Minimum score required to complete, Required
          for completion_requirement
          type 'min_score'.
        - module_item[published] (form, optional): Whether the module item is published and visible to students.
        - module_item[module_id] (form, optional): Move this item to another module by specifying the target module id
          here.
          The target module must be in the same course.

- **POST** /v1/courses/{course_id}/modules/{module_id}/items/{id}/select_mastery_path
    - Description: Select a mastery path
    - Parameters:
        - course_id (path, required): ID
        - module_id (path, required): ID
        - id (path, required): ID
        - assignment_set_id (form, optional): Assignment set chosen, as specified in the mastery_paths portion of the
          context module item response
        - student_id (form, optional): Which student the selection applies to. If not specified, current user is
          implied.

- **DELETE** /v1/courses/{course_id}/modules/{module_id}/items/{id}
    - Description: Delete module item
    - Parameters:
        - course_id (path, required): ID
        - module_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/courses/{course_id}/modules/{module_id}/items/{id}/done
    - Description: Mark module item as done/not done
    - Parameters:
        - course_id (path, required): ID
        - module_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/module_item_sequence
    - Description: Get module item sequence
    - Parameters:
        - course_id (path, required): ID
        - asset_type (query, optional): The type of asset to find module sequence information for. Use the ModuleItem if
          it is known
          (e.g., the user navigated from a module item), since this will avoid ambiguity if the asset
          appears more than once in the module sequence.
        - asset_id (query, optional): The id of the asset (or the url in the case of a Page)

- **POST** /v1/courses/{course_id}/modules/{module_id}/items/{id}/mark_read
    - Description: Mark module item read
    - Parameters:
        - course_id (path, required): ID
        - module_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/modules/{context_module_id}/assignment_overrides
    - Description: List a module's overrides
    - Parameters:
        - course_id (path, required): ID
        - context_module_id (path, required): ID

- **PUT** /v1/courses/{course_id}/modules/{context_module_id}/assignment_overrides
    - Description: Update a module's overrides
    - Parameters:
        - course_id (path, required): ID
        - context_module_id (path, required): ID
        - overrides (form, required): List of overrides to apply to the module. Overrides that already exist should
          include an ID
          and will be updated if needed. New overrides will be created for overrides in the list
          without an ID. Overrides not included in the list will be deleted. Providing an empty list
          will delete all of the module's overrides. Keys for each override object can include: 'id',
          'title', 'student_ids', and 'course_section_id'.

### Names and Role

Path: `/names_and_role.json`

- **GET** /lti/courses/{course_id}/names_and_roles
    - Description: List Course Memberships
    - Parameters:
        - course_id (path, required): ID
        - rlid (query, optional): If specified only NamesAndRoleMemberships with access to the LTI link references by
          this `rlid` will be included.
          Also causes the member array to be included for each returned NamesAndRoleMembership.
          If the `role` parameter is also present, it will be 'and-ed' together with this parameter
        - role (query, optional): If specified only NamesAndRoleMemberships having this role in the given Course will be
          included.
          Value must be a fully-qualified LTI/LIS role URN.
          If the `rlid` parameter is also present, it will be 'and-ed' together with this parameter
        - limit (query, optional): May be used to limit the number of NamesAndRoleMemberships returned in a page.
          Defaults to 50.

- **GET** /lti/groups/{group_id}/names_and_roles
    - Description: List Group Memberships
    - Parameters:
        - group_id (path, required): ID
        - `rlid` (query, optional): If specified only NamesAndRoleMemberships with access to the LTI link references by
          this `rlid` will be included.
          Also causes the member array to be included for each returned NamesAndRoleMembership.
          If the role parameter is also present, it will be 'and-ed' together with this parameter
        - role (query, optional): If specified only NamesAndRoleMemberships having this role in the given Group will be
          included.
          Value must be a fully-qualified LTI/LIS role URN. Further, only
          http://purl.imsglobal.org/vocab/lis/v2/membership#Member and
          http://purl.imsglobal.org/vocab/lis/v2/membership#Manager are supported.
          If the `rlid` parameter is also present, it will be 'and-ed' together with this parameter
        - limit (query, optional): May be used to limit the number of NamesAndRoleMemberships returned in a page.
          Defaults to 50.

### Notification Preferences

Path: `/notification_preferences.json`

- **GET** /v1/users/{user_id}/communication_channels/{communication_channel_id}/notification_preferences
    - Description: List preferences
    - Parameters:
        - user_id (path, required): ID
        - communication_channel_id (path, required): ID

- **GET** /v1/users/{user_id}/communication_channels/{type}/{address}/notification_preferences
    - Description: List preferences
    - Parameters:
        - user_id (path, required): ID
        - type (path, required): ID
        - address (path, required): ID

- **GET** /v1/users/{user_id}/communication_channels/{communication_channel_id}/notification_preference_categories
    - Description: List of preference categories
    - Parameters:
        - user_id (path, required): ID
        - communication_channel_id (path, required): ID

- **GET** /v1/users/{user_id}/communication_channels/{communication_channel_id}/notification_preferences/{notification}
    - Description: Get a preference
    - Parameters:
        - user_id (path, required): ID
        - communication_channel_id (path, required): ID
        - notification (path, required): ID

- **GET** /v1/users/{user_id}/communication_channels/{type}/{address}/notification_preferences/{notification}
    - Description: Get a preference
    - Parameters:
        - user_id (path, required): ID
        - type (path, required): ID
        - address (path, required): ID
        - notification (path, required): ID

- **PUT** /v1/users/self/communication_channels/{communication_channel_id}/notification_preferences/{notification}
    - Description: Update a preference
    - Parameters:
        - communication_channel_id (path, required): ID
        - notification (path, required): ID
        - notification_preferences[frequency] (form, required): The desired frequency for this notification

- **PUT** /v1/users/self/communication_channels/{type}/{address}/notification_preferences/{notification}
    - Description: Update a preference
    - Parameters:
        - type (path, required): ID
        - address (path, required): ID
        - notification (path, required): ID
        - notification_preferences[frequency] (form, required): The desired frequency for this notification

- **PUT** /v1/users/self/communication_channels/{communication_channel_id}/notification_preference_categories/{category}
    - Description: Update preferences by category
    - Parameters:
        - communication_channel_id (path, required): ID
        - category (path, required): The name of the category. Must be parameterized (e.g. The category "Course Content"
          should be "course_content")
        - notification_preferences[frequency] (form, required): The desired frequency for each notification in the
          category

- **PUT** /v1/users/self/communication_channels/{communication_channel_id}/notification_preferences
    - Description: Update multiple preferences
    - Parameters:
        - communication_channel_id (path, required): ID
        - notification_preferences[<X>][frequency] (form, required): The desired frequency for <X> notification

- **PUT** /v1/users/self/communication_channels/{type}/{address}/notification_preferences
    - Description: Update multiple preferences
    - Parameters:
        - type (path, required): ID
        - address (path, required): ID
        - notification_preferences[<X>][frequency] (form, required): The desired frequency for <X> notification

### Originality Reports

Path: `/originality_reports.json`

- **POST** /lti/assignments/{assignment_id}/submissions/{submission_id}/originality_report
    - Description: Create an Originality Report
    - Parameters:
        - assignment_id (path, required): ID
        - submission_id (path, required): ID
        - originality_report[file_id] (form, optional): The id of the file being given an originality score. Required
          if creating a report associated with a file.
        - originality_report[originality_score] (form, required): A number between 0 and 100 representing the measure of
          the
          specified file's originality.
        - originality_report[originality_report_url] (form, optional): The URL where the originality report for the
          specified
          file may be found.
        - originality_report[originality_report_file_id] (form, optional): The ID of the file within Canvas that
          contains the originality
          report for the submitted file provided in the request URL.
        - originality_report[tool_setting][resource_type_code] (form, optional): The resource type code of the resource
          handler Canvas should use for the
          LTI launch for viewing originality reports. If set Canvas will launch
          to the message with type 'basic-lti-launch-request' in the specified
          resource handler rather than using the originality_report_url.
        - originality_report[tool_setting][resource_url] (form, optional): The URL Canvas should launch to when showing
          an LTI originality report.
          Note that this value is inferred from the specified resource handler's
          message "path" value (See `resource_type_code`) unless
          it is specified. If this parameter is used a `resource_type_code`
          must also be specified.
        - originality_report[workflow_state] (form, optional): May be set to "pending", "error", or "scored". If an
          originality score
          is provided a workflow state of "scored" will be inferred.
        - originality_report[error_message] (form, optional): A message describing the error. If set, the "
          workflow_state"
          will be set to "error."
        - originality_report[attempt] (form, optional): If no `file_id` is given, and no file is required for the
          assignment
          (that is, the assignment allows an online text entry), this parameter
          may be given to clarify which attempt number the report is for (in the
          case of resubmissions). If this field is omitted and no `file_id` is
          given, the report will be created (or updated, if it exists) for the
          first submission attempt with no associated file.

- **PUT** /lti/assignments/{assignment_id}/submissions/{submission_id}/originality_report/{id}
    - Description: Edit an Originality Report
    - Parameters:
        - assignment_id (path, required): ID
        - submission_id (path, required): ID
        - id (path, required): ID
        - originality_report[originality_score] (form, optional): A number between 0 and 100 representing the measure of
          the
          specified file's originality.
        - originality_report[originality_report_url] (form, optional): The URL where the originality report for the
          specified
          file may be found.
        - originality_report[originality_report_file_id] (form, optional): The ID of the file within Canvas that
          contains the originality
          report for the submitted file provided in the request URL.
        - originality_report[tool_setting][resource_type_code] (form, optional): The resource type code of the resource
          handler Canvas should use for the
          LTI launch for viewing originality reports. If set Canvas will launch
          to the message with type 'basic-lti-launch-request' in the specified
          resource handler rather than using the originality_report_url.
        - originality_report[tool_setting][resource_url] (form, optional): The URL Canvas should launch to when showing
          an LTI originality report.
          Note that this value is inferred from the specified resource handler's
          message "path" value (See `resource_type_code`) unless
          it is specified. If this parameter is used a `resource_type_code`
          must also be specified.
        - originality_report[workflow_state] (form, optional): May be set to "pending", "error", or "scored". If an
          originality score
          is provided a workflow state of "scored" will be inferred.
        - originality_report[error_message] (form, optional): A message describing the error. If set, the "
          workflow_state"
          will be set to "error."

- **PUT** /lti/assignments/{assignment_id}/files/{file_id}/originality_report
    - Description: Edit an Originality Report
    - Parameters:
        - assignment_id (path, required): ID
        - file_id (path, required): ID
        - originality_report[originality_score] (form, optional): A number between 0 and 100 representing the measure of
          the
          specified file's originality.
        - originality_report[originality_report_url] (form, optional): The URL where the originality report for the
          specified
          file may be found.
        - originality_report[originality_report_file_id] (form, optional): The ID of the file within Canvas that
          contains the originality
          report for the submitted file provided in the request URL.
        - originality_report[tool_setting][resource_type_code] (form, optional): The resource type code of the resource
          handler Canvas should use for the
          LTI launch for viewing originality reports. If set Canvas will launch
          to the message with type 'basic-lti-launch-request' in the specified
          resource handler rather than using the originality_report_url.
        - originality_report[tool_setting][resource_url] (form, optional): The URL Canvas should launch to when showing
          an LTI originality report.
          Note that this value is inferred from the specified resource handler's
          message "path" value (See `resource_type_code`) unless
          it is specified. If this parameter is used a `resource_type_code`
          must also be specified.
        - originality_report[workflow_state] (form, optional): May be set to "pending", "error", or "scored". If an
          originality score
          is provided a workflow state of "scored" will be inferred.
        - originality_report[error_message] (form, optional): A message describing the error. If set, the "
          workflow_state"
          will be set to "error."

- **GET** /lti/assignments/{assignment_id}/submissions/{submission_id}/originality_report/{id}
    - Description: Show an Originality Report
    - Parameters:
        - assignment_id (path, required): ID
        - submission_id (path, required): ID
        - id (path, required): ID

- **GET** /lti/assignments/{assignment_id}/files/{file_id}/originality_report
    - Description: Show an Originality Report
    - Parameters:
        - assignment_id (path, required): ID
        - file_id (path, required): ID

### Outcome Groups

Path: `/outcome_groups.json`

- **GET** /v1/global/root_outcome_group
    - Description: Redirect to root outcome group for context

- **GET** /v1/accounts/{account_id}/root_outcome_group
    - Description: Redirect to root outcome group for context
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/root_outcome_group
    - Description: Redirect to root outcome group for context
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/accounts/{account_id}/outcome_groups
    - Description: Get all outcome groups for context
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/outcome_groups
    - Description: Get all outcome groups for context
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/accounts/{account_id}/outcome_group_links
    - Description: Get all outcome links for context
    - Parameters:
        - account_id (path, required): ID
        - outcome_style (query, optional): The detail level of the outcomes. Defaults to "abbrev".
          Specify "full" for more information.
        - outcome_group_style (query, optional): The detail level of the outcome groups. Defaults to "abbrev".
          Specify "full" for more information.

- **GET** /v1/courses/{course_id}/outcome_group_links
    - Description: Get all outcome links for context
    - Parameters:
        - course_id (path, required): ID
        - outcome_style (query, optional): The detail level of the outcomes. Defaults to "abbrev".
          Specify "full" for more information.
        - outcome_group_style (query, optional): The detail level of the outcome groups. Defaults to "abbrev".
          Specify "full" for more information.

- **GET** /v1/global/outcome_groups/{id}
    - Description: Show an outcome group
    - Parameters:
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/outcome_groups/{id}
    - Description: Show an outcome group
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/outcome_groups/{id}
    - Description: Show an outcome group
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/global/outcome_groups/{id}
    - Description: Update an outcome group
    - Parameters:
        - id (path, required): ID
        - title (form, optional): The new outcome group title.
        - description (form, optional): The new outcome group description.
        - vendor_guid (form, optional): A custom GUID for the learning standard.
        - parent_outcome_group_id (form, optional): The id of the new parent outcome group.

- **PUT** /v1/accounts/{account_id}/outcome_groups/{id}
    - Description: Update an outcome group
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - title (form, optional): The new outcome group title.
        - description (form, optional): The new outcome group description.
        - vendor_guid (form, optional): A custom GUID for the learning standard.
        - parent_outcome_group_id (form, optional): The id of the new parent outcome group.

- **PUT** /v1/courses/{course_id}/outcome_groups/{id}
    - Description: Update an outcome group
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - title (form, optional): The new outcome group title.
        - description (form, optional): The new outcome group description.
        - vendor_guid (form, optional): A custom GUID for the learning standard.
        - parent_outcome_group_id (form, optional): The id of the new parent outcome group.

- **DELETE** /v1/global/outcome_groups/{id}
    - Description: Delete an outcome group
    - Parameters:
        - id (path, required): ID

- **DELETE** /v1/accounts/{account_id}/outcome_groups/{id}
    - Description: Delete an outcome group
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/courses/{course_id}/outcome_groups/{id}
    - Description: Delete an outcome group
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/global/outcome_groups/{id}/outcomes
    - Description: List linked outcomes
    - Parameters:
        - id (path, required): ID
        - outcome_style (query, optional): The detail level of the outcomes. Defaults to "abbrev".
          Specify "full" for more information.

- **GET** /v1/accounts/{account_id}/outcome_groups/{id}/outcomes
    - Description: List linked outcomes
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - outcome_style (query, optional): The detail level of the outcomes. Defaults to "abbrev".
          Specify "full" for more information.

- **GET** /v1/courses/{course_id}/outcome_groups/{id}/outcomes
    - Description: List linked outcomes
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - outcome_style (query, optional): The detail level of the outcomes. Defaults to "abbrev".
          Specify "full" for more information.

- **POST** /v1/global/outcome_groups/{id}/outcomes
    - Description: Create/link an outcome
    - Parameters:
        - id (path, required): ID
        - outcome_id (form, optional): The ID of the existing outcome to link.
        - move_from (form, optional): The ID of the old outcome group. Only used if outcome_id is present.
        - title (form, optional): The title of the new outcome. Required if outcome_id is absent.
        - display_name (form, optional): A friendly name shown in reports for outcomes with cryptic titles,
          such as common core standards names.
        - description (form, optional): The description of the new outcome.
        - vendor_guid (form, optional): A custom GUID for the learning standard.
        - mastery_points (form, optional): The mastery threshold for the embedded rubric criterion.
        - ratings[description] (form, optional): The description of a rating level for the embedded rubric criterion.
        - ratings[points] (form, optional): The points corresponding to a rating level for the embedded rubric
          criterion.
        - calculation_method (form, optional): The new calculation method. Defaults to "decaying_average"
          if the Outcomes New Decaying Average Calculation Method FF is ENABLED
          then Defaults to "weighted_average"
        - calculation_int (form, optional): The new calculation int. Only applies if the calculation_method is "
          weighted_average", "decaying_average" or "n_mastery". Defaults to 65

- **PUT** /v1/global/outcome_groups/{id}/outcomes/{outcome_id}
    - Description: Create/link an outcome
    - Parameters:
        - id (path, required): ID
        - outcome_id (path, required): The ID of the existing outcome to link.
        - move_from (form, optional): The ID of the old outcome group. Only used if outcome_id is present.
        - title (form, optional): The title of the new outcome. Required if outcome_id is absent.
        - display_name (form, optional): A friendly name shown in reports for outcomes with cryptic titles,
          such as common core standards names.
        - description (form, optional): The description of the new outcome.
        - vendor_guid (form, optional): A custom GUID for the learning standard.
        - mastery_points (form, optional): The mastery threshold for the embedded rubric criterion.
        - ratings[description] (form, optional): The description of a rating level for the embedded rubric criterion.
        - ratings[points] (form, optional): The points corresponding to a rating level for the embedded rubric
          criterion.
        - calculation_method (form, optional): The new calculation method. Defaults to "decaying_average"
          if the Outcomes New Decaying Average Calculation Method FF is ENABLED
          then Defaults to "weighted_average"
        - calculation_int (form, optional): The new calculation int. Only applies if the calculation_method is "
          weighted_average", "decaying_average" or "n_mastery". Defaults to 65

- **POST** /v1/accounts/{account_id}/outcome_groups/{id}/outcomes
    - Description: Create/link an outcome
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - outcome_id (form, optional): The ID of the existing outcome to link.
        - move_from (form, optional): The ID of the old outcome group. Only used if outcome_id is present.
        - title (form, optional): The title of the new outcome. Required if outcome_id is absent.
        - display_name (form, optional): A friendly name shown in reports for outcomes with cryptic titles,
          such as common core standards names.
        - description (form, optional): The description of the new outcome.
        - vendor_guid (form, optional): A custom GUID for the learning standard.
        - mastery_points (form, optional): The mastery threshold for the embedded rubric criterion.
        - ratings[description] (form, optional): The description of a rating level for the embedded rubric criterion.
        - ratings[points] (form, optional): The points corresponding to a rating level for the embedded rubric
          criterion.
        - calculation_method (form, optional): The new calculation method. Defaults to "decaying_average"
          if the Outcomes New Decaying Average Calculation Method FF is ENABLED
          then Defaults to "weighted_average"
        - calculation_int (form, optional): The new calculation int. Only applies if the calculation_method is "
          weighted_average", "decaying_average" or "n_mastery". Defaults to 65

- **PUT** /v1/accounts/{account_id}/outcome_groups/{id}/outcomes/{outcome_id}
    - Description: Create/link an outcome
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - outcome_id (path, required): The ID of the existing outcome to link.
        - move_from (form, optional): The ID of the old outcome group. Only used if outcome_id is present.
        - title (form, optional): The title of the new outcome. Required if outcome_id is absent.
        - display_name (form, optional): A friendly name shown in reports for outcomes with cryptic titles,
          such as common core standards names.
        - description (form, optional): The description of the new outcome.
        - vendor_guid (form, optional): A custom GUID for the learning standard.
        - mastery_points (form, optional): The mastery threshold for the embedded rubric criterion.
        - ratings[description] (form, optional): The description of a rating level for the embedded rubric criterion.
        - ratings[points] (form, optional): The points corresponding to a rating level for the embedded rubric
          criterion.
        - calculation_method (form, optional): The new calculation method. Defaults to "decaying_average"
          if the Outcomes New Decaying Average Calculation Method FF is ENABLED
          then Defaults to "weighted_average"
        - calculation_int (form, optional): The new calculation int. Only applies if the calculation_method is "
          weighted_average", "decaying_average" or "n_mastery". Defaults to 65

- **POST** /v1/courses/{course_id}/outcome_groups/{id}/outcomes
    - Description: Create/link an outcome
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - outcome_id (form, optional): The ID of the existing outcome to link.
        - move_from (form, optional): The ID of the old outcome group. Only used if outcome_id is present.
        - title (form, optional): The title of the new outcome. Required if outcome_id is absent.
        - display_name (form, optional): A friendly name shown in reports for outcomes with cryptic titles,
          such as common core standards names.
        - description (form, optional): The description of the new outcome.
        - vendor_guid (form, optional): A custom GUID for the learning standard.
        - mastery_points (form, optional): The mastery threshold for the embedded rubric criterion.
        - ratings[description] (form, optional): The description of a rating level for the embedded rubric criterion.
        - ratings[points] (form, optional): The points corresponding to a rating level for the embedded rubric
          criterion.
        - calculation_method (form, optional): The new calculation method. Defaults to "decaying_average"
          if the Outcomes New Decaying Average Calculation Method FF is ENABLED
          then Defaults to "weighted_average"
        - calculation_int (form, optional): The new calculation int. Only applies if the calculation_method is "
          weighted_average", "decaying_average" or "n_mastery". Defaults to 65

- **PUT** /v1/courses/{course_id}/outcome_groups/{id}/outcomes/{outcome_id}
    - Description: Create/link an outcome
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - outcome_id (path, required): The ID of the existing outcome to link.
        - move_from (form, optional): The ID of the old outcome group. Only used if outcome_id is present.
        - title (form, optional): The title of the new outcome. Required if outcome_id is absent.
        - display_name (form, optional): A friendly name shown in reports for outcomes with cryptic titles,
          such as common core standards names.
        - description (form, optional): The description of the new outcome.
        - vendor_guid (form, optional): A custom GUID for the learning standard.
        - mastery_points (form, optional): The mastery threshold for the embedded rubric criterion.
        - ratings[description] (form, optional): The description of a rating level for the embedded rubric criterion.
        - ratings[points] (form, optional): The points corresponding to a rating level for the embedded rubric
          criterion.
        - calculation_method (form, optional): The new calculation method. Defaults to "decaying_average"
          if the Outcomes New Decaying Average Calculation Method FF is ENABLED
          then Defaults to "weighted_average"
        - calculation_int (form, optional): The new calculation int. Only applies if the calculation_method is "
          weighted_average", "decaying_average" or "n_mastery". Defaults to 65

- **DELETE** /v1/global/outcome_groups/{id}/outcomes/{outcome_id}
    - Description: Unlink an outcome
    - Parameters:
        - id (path, required): ID
        - outcome_id (path, required): ID

- **DELETE** /v1/accounts/{account_id}/outcome_groups/{id}/outcomes/{outcome_id}
    - Description: Unlink an outcome
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - outcome_id (path, required): ID

- **DELETE** /v1/courses/{course_id}/outcome_groups/{id}/outcomes/{outcome_id}
    - Description: Unlink an outcome
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - outcome_id (path, required): ID

- **GET** /v1/global/outcome_groups/{id}/subgroups
    - Description: List subgroups
    - Parameters:
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/outcome_groups/{id}/subgroups
    - Description: List subgroups
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/outcome_groups/{id}/subgroups
    - Description: List subgroups
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/global/outcome_groups/{id}/subgroups
    - Description: Create a subgroup
    - Parameters:
        - id (path, required): ID
        - title (form, required): The title of the new outcome group.
        - description (form, optional): The description of the new outcome group.
        - vendor_guid (form, optional): A custom GUID for the learning standard

- **POST** /v1/accounts/{account_id}/outcome_groups/{id}/subgroups
    - Description: Create a subgroup
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - title (form, required): The title of the new outcome group.
        - description (form, optional): The description of the new outcome group.
        - vendor_guid (form, optional): A custom GUID for the learning standard

- **POST** /v1/courses/{course_id}/outcome_groups/{id}/subgroups
    - Description: Create a subgroup
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - title (form, required): The title of the new outcome group.
        - description (form, optional): The description of the new outcome group.
        - vendor_guid (form, optional): A custom GUID for the learning standard

- **POST** /v1/global/outcome_groups/{id}/import
    - Description: Import an outcome group
    - Parameters:
        - id (path, required): ID
        - source_outcome_group_id (form, required): The ID of the source outcome group.
        - async (form, optional): If true, perform action asynchronously. In that case, this endpoint
          will return a Progress object instead of an OutcomeGroup.
          Use the {api:ProgressController#show progress endpoint}
          to query the status of the operation. The imported outcome group id
          and url will be returned in the results of the Progress object
          as "outcome_group_id" and "outcome_group_url"

- **POST** /v1/accounts/{account_id}/outcome_groups/{id}/import
    - Description: Import an outcome group
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - source_outcome_group_id (form, required): The ID of the source outcome group.
        - async (form, optional): If true, perform action asynchronously. In that case, this endpoint
          will return a Progress object instead of an OutcomeGroup.
          Use the {api:ProgressController#show progress endpoint}
          to query the status of the operation. The imported outcome group id
          and url will be returned in the results of the Progress object
          as "outcome_group_id" and "outcome_group_url"

- **POST** /v1/courses/{course_id}/outcome_groups/{id}/import
    - Description: Import an outcome group
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - source_outcome_group_id (form, required): The ID of the source outcome group.
        - async (form, optional): If true, perform action asynchronously. In that case, this endpoint
          will return a Progress object instead of an OutcomeGroup.
          Use the {api:ProgressController#show progress endpoint}
          to query the status of the operation. The imported outcome group id
          and url will be returned in the results of the Progress object
          as "outcome_group_id" and "outcome_group_url"

### Outcome Imports

Path: `/outcome_imports.json`

- **POST** /v1/accounts/{account_id}/outcome_imports
    - Description: Import Outcomes
    - Parameters:
        - account_id (path, required): ID
        - import_type (form, optional): Choose the data format for reading outcome data. With a standard Canvas
          install, this option can only be 'instructure_csv', and if unprovided,
          will be assumed to be so. Can be part of the query string.
        - attachment (form, optional): There are two ways to post outcome import data - either via a
          multipart/form-data form-field-style attachment, or via a non-multipart
          raw post request.

'attachment' is required for multipart/form-data style posts. Assumed to
be outcome data from a file upload form field named 'attachment'.

Examples:
curl -F attachment=@<filename> -H "Authorization: Bearer <token>" \
'https://<canvas>/api/v1/accounts/<account_id>/outcome_imports?import_type=instructure_csv'
curl -F attachment=@<filename> -H "Authorization: Bearer <token>" \
'https://<canvas>/api/v1/courses/<course_id>/outcome_imports?import_type=instructure_csv'

If you decide to do a raw post, you can skip the 'attachment' argument,
but you will then be required to provide a suitable Content-Type header.
You are encouraged to also provide the 'extension' argument.

Examples:
curl -H 'Content-Type: text/csv' --data-binary @<filename>.csv \
-H "Authorization: Bearer <token>" \
'https://<canvas>/api/v1/accounts/<account_id>/outcome_imports?import_type=instructure_csv'

curl -H 'Content-Type: text/csv' --data-binary @<filename>.csv \
-H "Authorization: Bearer <token>" \
'https://<canvas>/api/v1/courses/<course_id>/outcome_imports?import_type=instructure_csv'
- extension (form, optional): Recommended for raw post request style imports. This field will be used to
distinguish between csv and other file format extensions that
would usually be provided with the filename in the multipart post request
scenario. If not provided, this value will be inferred from the
Content-Type, falling back to csv-file format if all else fails.

- **POST** /v1/courses/{course_id}/outcome_imports
    - Description: Import Outcomes
    - Parameters:
        - course_id (path, required): ID
        - import_type (form, optional): Choose the data format for reading outcome data. With a standard Canvas
          install, this option can only be 'instructure_csv', and if unprovided,
          will be assumed to be so. Can be part of the query string.
        - attachment (form, optional): There are two ways to post outcome import data - either via a
          multipart/form-data form-field-style attachment, or via a non-multipart
          raw post request.

'attachment' is required for multipart/form-data style posts. Assumed to
be outcome data from a file upload form field named 'attachment'.

Examples:
curl -F attachment=@<filename> -H "Authorization: Bearer <token>" \
'https://<canvas>/api/v1/accounts/<account_id>/outcome_imports?import_type=instructure_csv'
curl -F attachment=@<filename> -H "Authorization: Bearer <token>" \
'https://<canvas>/api/v1/courses/<course_id>/outcome_imports?import_type=instructure_csv'

If you decide to do a raw post, you can skip the 'attachment' argument,
but you will then be required to provide a suitable Content-Type header.
You are encouraged to also provide the 'extension' argument.

Examples:
curl -H 'Content-Type: text/csv' --data-binary @<filename>.csv \
-H "Authorization: Bearer <token>" \
'https://<canvas>/api/v1/accounts/<account_id>/outcome_imports?import_type=instructure_csv'

curl -H 'Content-Type: text/csv' --data-binary @<filename>.csv \
-H "Authorization: Bearer <token>" \
'https://<canvas>/api/v1/courses/<course_id>/outcome_imports?import_type=instructure_csv'
- extension (form, optional): Recommended for raw post request style imports. This field will be used to
distinguish between csv and other file format extensions that
would usually be provided with the filename in the multipart post request
scenario. If not provided, this value will be inferred from the
Content-Type, falling back to csv-file format if all else fails.

- **GET** /v1/accounts/{account_id}/outcome_imports/{id}
    - Description: Get Outcome import status
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/outcome_imports/{id}
    - Description: Get Outcome import status
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/outcome_imports/{id}/created_group_ids
    - Description: Get IDs of outcome groups created after successful import
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/courses/{course_id}/outcome_imports/{id}/created_group_ids
    - Description: Get IDs of outcome groups created after successful import
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

### Outcome Results

Path: `/outcome_results.json`

- **GET** /v1/courses/{course_id}/outcome_results
    - Description: Get outcome results
    - Parameters:
        - course_id (path, required): ID
        - user_ids (query, optional): If specified, only the users whose ids are given will be included in the
          results. SIS ids can be used, prefixed by "sis_user_id:".
          It is an error to specify an id for a user who is not a student in
          the context.
        - outcome_ids (query, optional): If specified, only the outcomes whose ids are given will be included in the
          results. it is an error to specify an id for an outcome which is not linked
          to the context.
        - include (query,
          optional): [String, "alignments"|"outcomes"|"outcomes.alignments"|"outcome_groups"|"outcome_links"|"outcome_paths"|"users"]
          Specify additional collections to be side loaded with the result.
          "alignments" includes only the alignments referenced by the returned
          results.
          "outcomes.alignments" includes all alignments referenced by outcomes in the
          context.
        - include_hidden (query, optional): If true, results that are hidden from the learning mastery gradebook and
          student rollup
          scores will be included

- **POST** /v1/courses/{course_id}/assign_outcome_order
    - Description: Set outcome ordering for LMGB
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/courses/{course_id}/outcome_rollups
    - Description: Get outcome result rollups
    - Parameters:
        - course_id (path, required): ID
        - aggregate (query, optional): If specified, instead of returning one rollup for each user, all the user
          rollups will be combined into one rollup for the course that will contain
          the average (or median, see below) rollup score for each outcome.
        - aggregate_stat (query, optional): If aggregate rollups requested, then this value determines what
          statistic is used for the aggregate. Defaults to "mean" if this value
          is not specified.
        - user_ids (query, optional): If specified, only the users whose ids are given will be included in the
          results or used in an aggregate result. it is an error to specify an id
          for a user who is not a student in the context
        - outcome_ids (query, optional): If specified, only the outcomes whose ids are given will be included in the
          results. it is an error to specify an id for an outcome which is not linked
          to the context.
        - include (query,
          optional): [String, "courses"|"outcomes"|"outcomes.alignments"|"outcome_groups"|"outcome_links"|"outcome_paths"|"users"]
          Specify additional collections to be side loaded with the result.
        - exclude (query, optional): Specify additional values to exclude. "missing_user_rollups" excludes
          rollups for users without results.
        - sort_by (query, optional): If specified, sorts outcome result rollups. "student" sorting will sort
          by a user's sortable name. "outcome" sorting will sort by the given outcome's
          rollup score. The latter requires specifying the "sort_outcome_id" parameter.
          By default, the sort order is ascending.
        - sort_outcome_id (query, optional): If outcome sorting requested, then this determines which outcome to use
          for rollup score sorting.
        - sort_order (query, optional): If sorting requested, then this allows changing the default sort order of
          ascending to descending.
        - add_defaults (query, optional): If defaults are requested, then color and mastery level defaults will be
          added to outcome ratings in the rollup. This will only take effect if
          the Account Level Mastery Scales FF is DISABLED
        - contributing_scores (query, optional): If contributing scores are requested, then each individual outcome
          score will
          also include all graded artifacts that contributed to the outcome score

### Outcomes

Path: `/outcomes.json`

- **GET** /v1/outcomes/{id}
    - Description: Show an outcome
    - Parameters:
        - id (path, required): ID
        - add_defaults (query, optional): If defaults are requested, then color and mastery level defaults will be
          added to outcome ratings in the result. This will only take effect if
          the Account Level Mastery Scales FF is DISABLED

- **PUT** /v1/outcomes/{id}
    - Description: Update an outcome
    - Parameters:
        - id (path, required): ID
        - title (form, optional): The new outcome title.
        - display_name (form, optional): A friendly name shown in reports for outcomes with cryptic titles,
          such as common core standards names.
        - description (form, optional): The new outcome description.
        - vendor_guid (form, optional): A custom GUID for the learning standard.
        - mastery_points (form, optional): The new mastery threshold for the embedded rubric criterion.
        - ratings[description] (form, optional): The description of a new rating level for the embedded rubric
          criterion.
        - ratings[points] (form, optional): The points corresponding to a new rating level for the embedded rubric
          criterion.
        - calculation_method (form, optional): The new calculation method. If the
          Outcomes New Decaying Average Calculation Method FF is ENABLED
          then "weighted_average" can be used and it is same as previous "decaying_average"
          and new "decaying_average" will have improved version of calculation.
        - calculation_int (form, optional): The new calculation int. Only applies if the calculation_method is "
          decaying_average" or "n_mastery"
        - add_defaults (form, optional): If defaults are requested, then color and mastery level defaults will be
          added to outcome ratings in the result. This will only take effect if
          the Account Level Mastery Scales FF is DISABLED

- **GET** /v1/courses/{course_id}/outcome_alignments
    - Description: Get aligned assignments for an outcome in a course for a particular student
    - Parameters:
        - course_id (path, required): The id of the course
        - student_id (query, optional): The id of the student

### Pages

Path: `/pages.json`

- **GET** /v1/courses/{course_id}/front_page
    - Description: Show front page
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/groups/{group_id}/front_page
    - Description: Show front page
    - Parameters:
        - group_id (path, required): ID

- **POST** /v1/courses/{course_id}/pages/{url_or_id}/duplicate
    - Description: Duplicate page
    - Parameters:
        - course_id (path, required): ID
        - url_or_id (path, required): ID

- **PUT** /v1/courses/{course_id}/front_page
    - Description: Update/create front page
    - Parameters:
        - course_id (path, required): ID
        - wiki_page[title] (form, optional): The title for the new page. NOTE: changing a page's title will change its
          url. The updated url will be returned in the result.
        - wiki_page[body] (form, optional): The content for the new page.
        - wiki_page[editing_roles] (form, optional): Which user roles are allowed to edit this page. Any combination
          of these roles is allowed (separated by commas).

"teachers":: Allows editing by teachers in the course.
"students":: Allows editing by students in the course.
"members":: For group wikis, allows editing by members of the group.
"public":: Allows editing by any user.
- wiki_page[notify_of_update] (form, optional): Whether participants should be notified when this page changes.
- wiki_page[published] (form, optional): Whether the page is published (true) or draft state (false).

- **PUT** /v1/groups/{group_id}/front_page
    - Description: Update/create front page
    - Parameters:
        - group_id (path, required): ID
        - wiki_page[title] (form, optional): The title for the new page. NOTE: changing a page's title will change its
          url. The updated url will be returned in the result.
        - wiki_page[body] (form, optional): The content for the new page.
        - wiki_page[editing_roles] (form, optional): Which user roles are allowed to edit this page. Any combination
          of these roles is allowed (separated by commas).

"teachers":: Allows editing by teachers in the course.
"students":: Allows editing by students in the course.
"members":: For group wikis, allows editing by members of the group.
"public":: Allows editing by any user.
- wiki_page[notify_of_update] (form, optional): Whether participants should be notified when this page changes.
- wiki_page[published] (form, optional): Whether the page is published (true) or draft state (false).

- **GET** /v1/courses/{course_id}/pages
    - Description: List pages
    - Parameters:
        - course_id (path, required): ID
        - sort (query, optional): Sort results by this field.
        - order (query, optional): The sorting order. Defaults to 'asc'.
        - search_term (query, optional): The partial title of the pages to match and return.
        - published (query, optional): If true, include only published paqes. If false, exclude published
          pages. If not present, do not filter on published status.
        - include (query, optional): - "enrollments": Optionally include the page body with each Page.
          If this is a block_editor page, returns the block_editor_attributes.

- **GET** /v1/groups/{group_id}/pages
    - Description: List pages
    - Parameters:
        - group_id (path, required): ID
        - sort (query, optional): Sort results by this field.
        - order (query, optional): The sorting order. Defaults to 'asc'.
        - search_term (query, optional): The partial title of the pages to match and return.
        - published (query, optional): If true, include only published paqes. If false, exclude published
          pages. If not present, do not filter on published status.
        - include (query, optional): - "enrollments": Optionally include the page body with each Page.
          If this is a block_editor page, returns the block_editor_attributes.

- **POST** /v1/courses/{course_id}/pages
    - Description: Create page
    - Parameters:
        - course_id (path, required): ID
        - wiki_page[title] (form, required): The title for the new page.
        - wiki_page[body] (form, optional): The content for the new page.
        - wiki_page[editing_roles] (form, optional): Which user roles are allowed to edit this page. Any combination
          of these roles is allowed (separated by commas).

"teachers":: Allows editing by teachers in the course.
"students":: Allows editing by students in the course.
"members":: For group wikis, allows editing by members of the group.
"public":: Allows editing by any user.
- wiki_page[notify_of_update] (form, optional): Whether participants should be notified when this page changes.
- wiki_page[published] (form, optional): Whether the page is published (true) or draft state (false).
- wiki_page[front_page] (form, optional): Set an unhidden page as the front page (if true)
- wiki_page[publish_at] (form, optional): Schedule a future date/time to publish the page. This will have no effect
unless the
"Scheduled Page Publication" feature is enabled in the account. If a future date is
supplied, the page will be unpublished and wiki_page[published] will be ignored.

- **POST** /v1/groups/{group_id}/pages
    - Description: Create page
    - Parameters:
        - group_id (path, required): ID
        - wiki_page[title] (form, required): The title for the new page.
        - wiki_page[body] (form, optional): The content for the new page.
        - wiki_page[editing_roles] (form, optional): Which user roles are allowed to edit this page. Any combination
          of these roles is allowed (separated by commas).

"teachers":: Allows editing by teachers in the course.
"students":: Allows editing by students in the course.
"members":: For group wikis, allows editing by members of the group.
"public":: Allows editing by any user.
- wiki_page[notify_of_update] (form, optional): Whether participants should be notified when this page changes.
- wiki_page[published] (form, optional): Whether the page is published (true) or draft state (false).
- wiki_page[front_page] (form, optional): Set an unhidden page as the front page (if true)
- wiki_page[publish_at] (form, optional): Schedule a future date/time to publish the page. This will have no effect
unless the
"Scheduled Page Publication" feature is enabled in the account. If a future date is
supplied, the page will be unpublished and wiki_page[published] will be ignored.

- **GET** /v1/courses/{course_id}/pages/{url_or_id}
    - Description: Show page
    - Parameters:
        - course_id (path, required): ID
        - url_or_id (path, required): ID

- **GET** /v1/groups/{group_id}/pages/{url_or_id}
    - Description: Show page
    - Parameters:
        - group_id (path, required): ID
        - url_or_id (path, required): ID

- **PUT** /v1/courses/{course_id}/pages/{url_or_id}
    - Description: Update/create page
    - Parameters:
        - course_id (path, required): ID
        - url_or_id (path, required): ID
        - wiki_page[title] (form, optional): The title for the new page. NOTE: changing a page's title will change its
          url. The updated url will be returned in the result.
        - wiki_page[body] (form, optional): The content for the new page.
        - wiki_page[editing_roles] (form, optional): Which user roles are allowed to edit this page. Any combination
          of these roles is allowed (separated by commas).

"teachers":: Allows editing by teachers in the course.
"students":: Allows editing by students in the course.
"members":: For group wikis, allows editing by members of the group.
"public":: Allows editing by any user.
- wiki_page[notify_of_update] (form, optional): Whether participants should be notified when this page changes.
- wiki_page[published] (form, optional): Whether the page is published (true) or draft state (false).
- wiki_page[publish_at] (form, optional): Schedule a future date/time to publish the page. This will have no effect
unless the
"Scheduled Page Publication" feature is enabled in the account. If a future date is
set and the page is already published, it will be unpublished.
- wiki_page[front_page] (form, optional): Set an unhidden page as the front page (if true)

- **PUT** /v1/groups/{group_id}/pages/{url_or_id}
    - Description: Update/create page
    - Parameters:
        - group_id (path, required): ID
        - url_or_id (path, required): ID
        - wiki_page[title] (form, optional): The title for the new page. NOTE: changing a page's title will change its
          url. The updated url will be returned in the result.
        - wiki_page[body] (form, optional): The content for the new page.
        - wiki_page[editing_roles] (form, optional): Which user roles are allowed to edit this page. Any combination
          of these roles is allowed (separated by commas).

"teachers":: Allows editing by teachers in the course.
"students":: Allows editing by students in the course.
"members":: For group wikis, allows editing by members of the group.
"public":: Allows editing by any user.
- wiki_page[notify_of_update] (form, optional): Whether participants should be notified when this page changes.
- wiki_page[published] (form, optional): Whether the page is published (true) or draft state (false).
- wiki_page[publish_at] (form, optional): Schedule a future date/time to publish the page. This will have no effect
unless the
"Scheduled Page Publication" feature is enabled in the account. If a future date is
set and the page is already published, it will be unpublished.
- wiki_page[front_page] (form, optional): Set an unhidden page as the front page (if true)

- **DELETE** /v1/courses/{course_id}/pages/{url_or_id}
    - Description: Delete page
    - Parameters:
        - course_id (path, required): ID
        - url_or_id (path, required): ID

- **DELETE** /v1/groups/{group_id}/pages/{url_or_id}
    - Description: Delete page
    - Parameters:
        - group_id (path, required): ID
        - url_or_id (path, required): ID

- **GET** /v1/courses/{course_id}/pages/{url_or_id}/revisions
    - Description: List revisions
    - Parameters:
        - course_id (path, required): ID
        - url_or_id (path, required): ID

- **GET** /v1/groups/{group_id}/pages/{url_or_id}/revisions
    - Description: List revisions
    - Parameters:
        - group_id (path, required): ID
        - url_or_id (path, required): ID

- **GET** /v1/courses/{course_id}/pages/{url_or_id}/revisions/latest
    - Description: Show revision
    - Parameters:
        - course_id (path, required): ID
        - url_or_id (path, required): ID
        - summary (query, optional): If set, exclude page content from results

- **GET** /v1/groups/{group_id}/pages/{url_or_id}/revisions/latest
    - Description: Show revision
    - Parameters:
        - group_id (path, required): ID
        - url_or_id (path, required): ID
        - summary (query, optional): If set, exclude page content from results

- **GET** /v1/courses/{course_id}/pages/{url_or_id}/revisions/{revision_id}
    - Description: Show revision
    - Parameters:
        - course_id (path, required): ID
        - url_or_id (path, required): ID
        - revision_id (path, required): ID
        - summary (query, optional): If set, exclude page content from results

- **GET** /v1/groups/{group_id}/pages/{url_or_id}/revisions/{revision_id}
    - Description: Show revision
    - Parameters:
        - group_id (path, required): ID
        - url_or_id (path, required): ID
        - revision_id (path, required): ID
        - summary (query, optional): If set, exclude page content from results

- **POST** /v1/courses/{course_id}/pages/{url_or_id}/revisions/{revision_id}
    - Description: Revert to revision
    - Parameters:
        - course_id (path, required): ID
        - url_or_id (path, required): ID
        - revision_id (path, required): The revision to revert to (use the
          {api:WikiPagesApiController#revisions List Revisions API} to see
          available revisions)

- **POST** /v1/groups/{group_id}/pages/{url_or_id}/revisions/{revision_id}
    - Description: Revert to revision
    - Parameters:
        - group_id (path, required): ID
        - url_or_id (path, required): ID
        - revision_id (path, required): The revision to revert to (use the
          {api:WikiPagesApiController#revisions List Revisions API} to see
          available revisions)

### Peer Reviews

Path: `/peer_reviews.json`

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/peer_reviews
    - Description: Get all Peer Reviews
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - include (query, optional): Associations to include with the peer review.

- **GET** /v1/sections/{section_id}/assignments/{assignment_id}/peer_reviews
    - Description: Get all Peer Reviews
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - include (query, optional): Associations to include with the peer review.

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{submission_id}/peer_reviews
    - Description: Get all Peer Reviews
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - submission_id (path, required): ID
        - include (query, optional): Associations to include with the peer review.

- **GET** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{submission_id}/peer_reviews
    - Description: Get all Peer Reviews
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - submission_id (path, required): ID
        - include (query, optional): Associations to include with the peer review.

- **POST** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{submission_id}/peer_reviews
    - Description: Create Peer Review
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - submission_id (path, required): ID
        - user_id (form, required): user_id to assign as reviewer on this assignment

- **POST** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{submission_id}/peer_reviews
    - Description: Create Peer Review
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - submission_id (path, required): ID
        - user_id (form, required): user_id to assign as reviewer on this assignment

- **DELETE** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{submission_id}/peer_reviews
    - Description: Delete Peer Review
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - submission_id (path, required): ID
        - user_id (query, required): user_id to delete as reviewer on this assignment

- **DELETE** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{submission_id}/peer_reviews
    - Description: Delete Peer Review
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - submission_id (path, required): ID
        - user_id (query, required): user_id to delete as reviewer on this assignment

### Plagiarism Detection Platform Assignments

Path: `/plagiarism_detection_platform_assignments.json`

- **GET** /lti/assignments/{assignment_id}
    - Description: Get a single assignment (lti)
    - Parameters:
        - assignment_id (path, required): ID
        - user_id (query, optional): The id of the user. Can be a Canvas or LTI id for the user.

### Plagiarism Detection Platform Users

Path: `/plagiarism_detection_platform_users.json`

- **GET** /lti/users/{id}
    - Description: Get a single user (lti)
    - Parameters:
        - id (path, required): ID

- **GET** /lti/groups/{group_id}/users
    - Description: Get all users in a group (lti)
    - Parameters:
        - group_id (path, required): ID

### Plagiarism Detection Submissions

Path: `/plagiarism_detection_submissions.json`

- **GET** /lti/assignments/{assignment_id}/submissions/{submission_id}
    - Description: Get a single submission
    - Parameters:
        - assignment_id (path, required): ID
        - submission_id (path, required): ID

- **GET** /lti/assignments/{assignment_id}/submissions/{submission_id}/history
    - Description: Get the history of a single submission
    - Parameters:
        - assignment_id (path, required): ID
        - submission_id (path, required): ID

### Planner

Path: `/planner.json`

- **GET** /v1/planner/items
    - Description: List planner items
    - Parameters:
        - start_date (query, optional): Only return items starting from the given date.
          The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - end_date (query, optional): Only return items up to the given date.
          The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - context_codes (query, optional): List of context codes of courses and/or groups whose items you want to see.
          If not specified, defaults to all contexts associated to the current user.
          Note that concluded courses will be ignored unless specified in the includes[]
          parameter. The format of this field is the context type, followed by an underscore,
          followed by the context id. For example: course_42, group_123
        - observed_user_id (query, optional): Return planner items for the given observed user. Must be accompanied by
          context_codes[].
          The user making the request must be observing the observed user in all the courses specified by
          context_codes[].
        - filter (query, optional): Only return items that have new or unread activity

- **GET** /v1/users/{user_id}/planner/items
    - Description: List planner items
    - Parameters:
        - user_id (path, required): ID
        - start_date (query, optional): Only return items starting from the given date.
          The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - end_date (query, optional): Only return items up to the given date.
          The value should be formatted as: yyyy-mm-dd or ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - context_codes (query, optional): List of context codes of courses and/or groups whose items you want to see.
          If not specified, defaults to all contexts associated to the current user.
          Note that concluded courses will be ignored unless specified in the includes[]
          parameter. The format of this field is the context type, followed by an underscore,
          followed by the context id. For example: course_42, group_123
        - observed_user_id (query, optional): Return planner items for the given observed user. Must be accompanied by
          context_codes[].
          The user making the request must be observing the observed user in all the courses specified by
          context_codes[].
        - filter (query, optional): Only return items that have new or unread activity

- **GET** /v1/planner_notes
    - Description: List planner notes
    - Parameters:
        - start_date (query, optional): Only return notes with todo dates since the start_date (inclusive).
          No default. The value should be formatted as: yyyy-mm-dd or
          ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - end_date (query, optional): Only return notes with todo dates before the end_date (inclusive).
          No default. The value should be formatted as: yyyy-mm-dd or
          ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
          If end_date and start_date are both specified and equivalent,
          then only notes with todo dates on that day are returned.
        - context_codes (query, optional): List of context codes of courses whose notes you want to see.
          If not specified, defaults to all contexts that the user belongs to.
          The format of this field is the context type, followed by an
          underscore, followed by the context id. For example: course_42
          Including a code matching the user's own context code (e.g. user_1)
          will include notes that are not associated with any particular course.

- **GET** /v1/planner_notes/{id}
    - Description: Show a planner note
    - Parameters:
        - id (path, required): ID

- **PUT** /v1/planner_notes/{id}
    - Description: Update a planner note
    - Parameters:
        - id (path, required): ID
        - title (form, optional): The title of the planner note.
        - details (form, optional): Text of the planner note.
        - todo_date (form, optional): The date where this planner note should appear in the planner.
          The value should be formatted as: yyyy-mm-dd.
        - course_id (form, optional): The ID of the course to associate with the planner note. The caller must be able
          to view the course in order to
          associate it with a planner note. Use a null or empty value to remove a planner note from a course. Note that
          if
          the planner note is linked to a learning object, its course_id cannot be changed.

- **POST** /v1/planner_notes
    - Description: Create a planner note
    - Parameters:
        - title (form, optional): The title of the planner note.
        - details (form, optional): Text of the planner note.
        - todo_date (form, optional): The date where this planner note should appear in the planner.
          The value should be formatted as: yyyy-mm-dd.
        - course_id (form, optional): The ID of the course to associate with the planner note. The caller must be able
          to view the course in order to
          associate it with a planner note.
        - linked_object_type (form, optional): The type of a learning object to link to this planner note. Must be used
          in conjunction wtih linked_object_id
          and course_id. Valid linked_object_type values are:
          'announcement', 'assignment', 'discussion_topic', 'wiki_page', 'quiz'
        - linked_object_id (form, optional): The id of a learning object to link to this planner note. Must be used in
          conjunction with linked_object_type
          and course_id. The object must be in the same course as specified by course_id. If the title argument is not
          provided, the planner note will use the learning object's title as its title. Only one planner note may be
          linked to a specific learning object.

- **DELETE** /v1/planner_notes/{id}
    - Description: Delete a planner note
    - Parameters:
        - id (path, required): ID

- **GET** /v1/planner/overrides
    - Description: List planner overrides

- **GET** /v1/planner/overrides/{id}
    - Description: Show a planner override
    - Parameters:
        - id (path, required): ID

- **PUT** /v1/planner/overrides/{id}
    - Description: Update a planner override
    - Parameters:
        - id (path, required): ID
        - marked_complete (form, optional): determines whether the planner item is marked as completed
        - dismissed (form, optional): determines whether the planner item shows in the opportunities list

- **POST** /v1/planner/overrides
    - Description: Create a planner override
    - Parameters:
        - plannable_type (form, required): Type of the item that you are overriding in the planner
        - plannable_id (form, required): ID of the item that you are overriding in the planner
        - marked_complete (form, optional): If this is true, the item will show in the planner as completed
        - dismissed (form, optional): If this is true, the item will not show in the opportunities list

- **DELETE** /v1/planner/overrides/{id}
    - Description: Delete a planner override
    - Parameters:
        - id (path, required): ID

### Poll Sessions

Path: `/poll_sessions.json`

- **GET** /v1/polls/{poll_id}/poll_sessions
    - Description: List poll sessions for a poll
    - Parameters:
        - poll_id (path, required): ID

- **GET** /v1/polls/{poll_id}/poll_sessions/{id}
    - Description: Get the results for a single poll session
    - Parameters:
        - poll_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/polls/{poll_id}/poll_sessions
    - Description: Create a single poll session
    - Parameters:
        - poll_id (path, required): ID
        - poll_sessions[course_id] (form, required): The id of the course this session is associated with.
        - poll_sessions[course_section_id] (form, optional): The id of the course section this session is associated
          with.
        - poll_sessions[has_public_results] (form, optional): Whether or not results are viewable by students.

- **PUT** /v1/polls/{poll_id}/poll_sessions/{id}
    - Description: Update a single poll session
    - Parameters:
        - poll_id (path, required): ID
        - id (path, required): ID
        - poll_sessions[course_id] (form, optional): The id of the course this session is associated with.
        - poll_sessions[course_section_id] (form, optional): The id of the course section this session is associated
          with.
        - poll_sessions[has_public_results] (form, optional): Whether or not results are viewable by students.

- **DELETE** /v1/polls/{poll_id}/poll_sessions/{id}
    - Description: Delete a poll session
    - Parameters:
        - poll_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/polls/{poll_id}/poll_sessions/{id}/open
    - Description: Open a poll session
    - Parameters:
        - poll_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/polls/{poll_id}/poll_sessions/{id}/close
    - Description: Close an opened poll session
    - Parameters:
        - poll_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/poll_sessions/opened
    - Description: List opened poll sessions

- **GET** /v1/poll_sessions/closed
    - Description: List closed poll sessions

### PollChoices

Path: `/poll_choices.json`

- **GET** /v1/polls/{poll_id}/poll_choices
    - Description: List poll choices in a poll
    - Parameters:
        - poll_id (path, required): ID

- **GET** /v1/polls/{poll_id}/poll_choices/{id}
    - Description: Get a single poll choice
    - Parameters:
        - poll_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/polls/{poll_id}/poll_choices
    - Description: Create a single poll choice
    - Parameters:
        - poll_id (path, required): ID
        - poll_choices[text] (form, required): The descriptive text of the poll choice.
        - poll_choices[is_correct] (form, optional): Whether this poll choice is considered correct or not. Defaults to
          false.
        - poll_choices[position] (form, optional): The order this poll choice should be returned in the context it's
          sibling poll choices.

- **PUT** /v1/polls/{poll_id}/poll_choices/{id}
    - Description: Update a single poll choice
    - Parameters:
        - poll_id (path, required): ID
        - id (path, required): ID
        - poll_choices[text] (form, required): The descriptive text of the poll choice.
        - poll_choices[is_correct] (form, optional): Whether this poll choice is considered correct or not. Defaults to
          false.
        - poll_choices[position] (form, optional): The order this poll choice should be returned in the context it's
          sibling poll choices.

- **DELETE** /v1/polls/{poll_id}/poll_choices/{id}
    - Description: Delete a poll choice
    - Parameters:
        - poll_id (path, required): ID
        - id (path, required): ID

### Polls

Path: `/polls.json`

- **GET** /v1/polls
    - Description: List polls

- **GET** /v1/polls/{id}
    - Description: Get a single poll
    - Parameters:
        - id (path, required): ID

- **POST** /v1/polls
    - Description: Create a single poll
    - Parameters:
        - polls[question] (form, required): The title of the poll.
        - polls[description] (form, optional): A brief description or instructions for the poll.

- **PUT** /v1/polls/{id}
    - Description: Update a single poll
    - Parameters:
        - id (path, required): ID
        - polls[question] (form, required): The title of the poll.
        - polls[description] (form, optional): A brief description or instructions for the poll.

- **DELETE** /v1/polls/{id}
    - Description: Delete a poll
    - Parameters:
        - id (path, required): ID

### PollSubmissions

Path: `/poll_submissions.json`

- **GET** /v1/polls/{poll_id}/poll_sessions/{poll_session_id}/poll_submissions/{id}
    - Description: Get a single poll submission
    - Parameters:
        - poll_id (path, required): ID
        - poll_session_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/polls/{poll_id}/poll_sessions/{poll_session_id}/poll_submissions
    - Description: Create a single poll submission
    - Parameters:
        - poll_id (path, required): ID
        - poll_session_id (path, required): ID
        - poll_submissions[poll_choice_id] (form, required): The chosen poll choice for this submission.

### Proficiency Ratings

Path: `/proficiency_ratings.json`

- **POST** /v1/accounts/{account_id}/outcome_proficiency
    - Description: Create/update proficiency ratings
    - Parameters:
        - account_id (path, required): ID
        - ratings[description] (form, optional): The description of the rating level.
        - ratings[points] (form, optional): The non-negative number of points of the rating level. Points across ratings
          should be strictly decreasing in value.
        - ratings[mastery] (form, optional): Indicates the rating level where mastery is first achieved. Only one rating
          in a proficiency should be marked for mastery.
        - ratings[color] (form, optional): The color associated with the rating level. Should be a hex color code like '
          00FFFF'.

- **POST** /v1/courses/{course_id}/outcome_proficiency
    - Description: Create/update proficiency ratings
    - Parameters:
        - course_id (path, required): ID
        - ratings[description] (form, optional): The description of the rating level.
        - ratings[points] (form, optional): The non-negative number of points of the rating level. Points across ratings
          should be strictly decreasing in value.
        - ratings[mastery] (form, optional): Indicates the rating level where mastery is first achieved. Only one rating
          in a proficiency should be marked for mastery.
        - ratings[color] (form, optional): The color associated with the rating level. Should be a hex color code like '
          00FFFF'.

- **GET** /v1/accounts/{account_id}/outcome_proficiency
    - Description: Get proficiency ratings
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/outcome_proficiency
    - Description: Get proficiency ratings
    - Parameters:
        - course_id (path, required): ID

### Progress

Path: `/progress.json`

- **GET** /v1/progress/{id}
    - Description: Query progress
    - Parameters:
        - id (path, required): ID

- **POST** /v1/progress/{id}/cancel
    - Description: Cancel progress
    - Parameters:
        - id (path, required): ID

- **GET** /lti/courses/{course_id}/progress/{id}
    - Description: Query progress
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

### Public JWK

Path: `/public_jwk.json`

- **PUT** /lti/developer_key/update_public_jwk
    - Description: Update Public JWK
    - Parameters:
        - public_jwk (form, required): The new public jwk that will be set to the tools current public jwk.

### Quiz Assignment Overrides

Path: `/quiz_assignment_overrides.json`

- **GET** /v1/courses/{course_id}/quizzes/assignment_overrides
    - Description: Retrieve assignment-overridden dates for Classic Quizzes
    - Parameters:
        - course_id (path, required): ID
        - quiz_assignment_overrides[quiz_ids] (query, optional): An array of quiz IDs. If omitted, overrides for all
          quizzes available to
          the operating user will be returned.

- **GET** /v1/courses/{course_id}/new_quizzes/assignment_overrides
    - Description: Retrieve assignment-overridden dates for New Quizzes
    - Parameters:
        - course_id (path, required): ID
        - quiz_assignment_overrides[quiz_ids] (query, optional): An array of quiz IDs. If omitted, overrides for all
          quizzes available to
          the operating user will be returned.

### Quiz Extensions

Path: `/quiz_extensions.json`

- **POST** /v1/courses/{course_id}/quizzes/{quiz_id}/extensions
    - Description: Set extensions for student quiz submissions
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - quiz_extensions[user_id] (form, required): The ID of the user we want to add quiz extensions for.
        - quiz_extensions[extra_attempts] (form, optional): Number of times the student is allowed to re-take the quiz
          over the
          multiple-attempt limit. This is limited to 1000 attempts or less.
        - quiz_extensions[extra_time] (form, optional): The number of extra minutes to allow for all attempts. This will
          add to the existing time limit on the submission. This is limited to
          10080 minutes (1 week)
        - quiz_extensions[manually_unlocked] (form, optional): Allow the student to take the quiz even if it's locked
          for
          everyone else.
        - quiz_extensions[extend_from_now] (form, optional): The number of minutes to extend the quiz from the current
          time. This is
          mutually exclusive to extend_from_end_at. This is limited to 1440
          minutes (24 hours)
        - quiz_extensions[extend_from_end_at] (form, optional): The number of minutes to extend the quiz beyond the
          quiz's current
          ending time. This is mutually exclusive to extend_from_now. This is
          limited to 1440 minutes (24 hours)

### Quiz IP Filters

Path: `/quiz_ip_filters.json`

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/ip_filters
    - Description: Get available quiz IP filters.
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID

### Quiz Question Groups

Path: `/quiz_question_groups.json`

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/groups/{id}
    - Description: Get a single quiz group
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/quizzes/{quiz_id}/groups
    - Description: Create a question group
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - quiz_groups[name] (form, optional): The name of the question group.
        - quiz_groups[pick_count] (form, optional): The number of questions to randomly select for this group.
        - quiz_groups[question_points] (form, optional): The number of points to assign to each question in the group.
        - quiz_groups[assessment_question_bank_id] (form, optional): The id of the assessment question bank to pull
          questions from.

- **PUT** /v1/courses/{course_id}/quizzes/{quiz_id}/groups/{id}
    - Description: Update a question group
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID
        - quiz_groups[name] (form, optional): The name of the question group.
        - quiz_groups[pick_count] (form, optional): The number of questions to randomly select for this group.
        - quiz_groups[question_points] (form, optional): The number of points to assign to each question in the group.

- **DELETE** /v1/courses/{course_id}/quizzes/{quiz_id}/groups/{id}
    - Description: Delete a question group
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/quizzes/{quiz_id}/groups/{id}/reorder
    - Description: Reorder question groups
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID
        - order[id] (form, required): The associated item's unique identifier
        - order[type] (form, optional): The type of item is always 'question' for a group

### Quiz Questions

Path: `/quiz_questions.json`

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/questions
    - Description: List questions in a quiz or a submission
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - quiz_submission_id (query, optional): If specified, the endpoint will return the questions that were presented
          for that submission. This is useful if the quiz has been modified after
          the submission was created and the latest quiz version's set of questions
          does not match the submission's.
          NOTE: you must specify quiz_submission_attempt as well if you specify this
          parameter.
        - quiz_submission_attempt (query, optional): The attempt of the submission you want the questions for.

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/questions/{id}
    - Description: Get a single quiz question
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): The quiz question unique identifier.

- **POST** /v1/courses/{course_id}/quizzes/{quiz_id}/questions
    - Description: Create a single quiz question
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - question[question_name] (form, optional): The name of the question.
        - question[question_text] (form, optional): The text of the question.
        - question[quiz_group_id] (form, optional): The id of the quiz group to assign the question to.
        - question[question_type] (form, optional): The type of question. Multiple optional fields depend upon the type
          of question to be used.
        - question[position] (form, optional): The order in which the question will be displayed in the quiz in relation
          to other questions.
        - question[points_possible] (form, optional): The maximum amount of points received for answering this question
          correctly.
        - question[correct_comments] (form, optional): The comment to display if the student answers the question
          correctly.
        - question[incorrect_comments] (form, optional): The comment to display if the student answers incorrectly.
        - question[neutral_comments] (form, optional): The comment to display regardless of how the student answered.
        - question[text_after_answers] (form, optional): no description
        - question[answers] (form, optional): no description

- **PUT** /v1/courses/{course_id}/quizzes/{quiz_id}/questions/{id}
    - Description: Update an existing quiz question
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): The associated quiz's unique identifier.
        - id (path, required): The quiz question's unique identifier.
        - question[question_name] (form, optional): The name of the question.
        - question[question_text] (form, optional): The text of the question.
        - question[quiz_group_id] (form, optional): The id of the quiz group to assign the question to.
        - question[question_type] (form, optional): The type of question. Multiple optional fields depend upon the type
          of question to be used.
        - question[position] (form, optional): The order in which the question will be displayed in the quiz in relation
          to other questions.
        - question[points_possible] (form, optional): The maximum amount of points received for answering this question
          correctly.
        - question[correct_comments] (form, optional): The comment to display if the student answers the question
          correctly.
        - question[incorrect_comments] (form, optional): The comment to display if the student answers incorrectly.
        - question[neutral_comments] (form, optional): The comment to display regardless of how the student answered.
        - question[text_after_answers] (form, optional): no description
        - question[answers] (form, optional): no description

- **DELETE** /v1/courses/{course_id}/quizzes/{quiz_id}/questions/{id}
    - Description: Delete a quiz question
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): The associated quiz's unique identifier
        - id (path, required): The quiz question's unique identifier

### Quiz Reports

Path: `/quiz_reports.json`

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/reports
    - Description: Retrieve all quiz reports
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - includes_all_versions (query, optional): Whether to retrieve reports that consider all the submissions or only
          the most recent. Defaults to false, ignored for item_analysis reports.

- **POST** /v1/courses/{course_id}/quizzes/{quiz_id}/reports
    - Description: Create a quiz report
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - quiz_report[report_type] (form, required): The type of report to be generated.
        - quiz_report[includes_all_versions] (form, optional): Whether the report should consider all submissions or
          only the most
          recent. Defaults to false, ignored for item_analysis.
        - include (form, optional): Whether the output should include documents for the file and/or progress
          objects associated with this report. (Note: JSON-API only)

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/reports/{id}
    - Description: Get a quiz report
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): Whether the output should include documents for the file and/or progress
          objects associated with this report. (Note: JSON-API only)

- **DELETE** /v1/courses/{course_id}/quizzes/{quiz_id}/reports/{id}
    - Description: Abort the generation of a report, or remove a previously generated one
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID

### Quiz Statistics

Path: `/quiz_statistics.json`

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/statistics
    - Description: Fetching the latest quiz statistics
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - all_versions (query, optional): Whether the statistics report should include all submissions attempts.

### Quiz Submission Events

Path: `/quiz_submission_events.json`

- **POST** /v1/courses/{course_id}/quizzes/{quiz_id}/submissions/{id}/events
    - Description: Submit captured events
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID
        - quiz_submission_events (form, required): The submission events to be recorded

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/submissions/{id}/events
    - Description: Retrieve captured events
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID
        - attempt (query, optional): The specific submission attempt to look up the events for. If unspecified,
          the latest attempt will be used.

### Quiz Submission Files

Path: `/quiz_submission_files.json`

- **POST** /v1/courses/{course_id}/quizzes/{quiz_id}/submissions/self/files
    - Description: Upload a file
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - name (form, optional): The name of the quiz submission file
        - on_duplicate (form, optional): How to handle duplicate names

### Quiz Submission Questions

Path: `/quiz_submission_questions.json`

- **GET** /v1/quiz_submissions/{quiz_submission_id}/questions
    - Description: Get all quiz submission questions.
    - Parameters:
        - quiz_submission_id (path, required): ID
        - include (query, optional): Associations to include with the quiz submission question.

- **POST** /v1/quiz_submissions/{quiz_submission_id}/questions
    - Description: Answering questions
    - Parameters:
        - quiz_submission_id (path, required): ID
        - attempt (form, required): The attempt number of the quiz submission being taken. Note that this
          must be the latest attempt index, as questions for earlier attempts can
          not be modified.
        - validation_token (form, required): The unique validation token you received when the Quiz Submission was
          created.
        - access_code (form, optional): Access code for the Quiz, if any.
        - quiz_questions (form, optional): Set of question IDs and the answer value.

See {Appendix: Question Answer Formats} for the accepted answer formats
for each question type.

- **GET** /v1/quiz_submissions/{quiz_submission_id}/questions/{id}/formatted_answer
    - Description: Get a formatted student numerical answer.
    - Parameters:
        - quiz_submission_id (path, required): ID
        - id (path, required): ID
        - answer (query, required): no description

- **PUT** /v1/quiz_submissions/{quiz_submission_id}/questions/{id}/flag
    - Description: Flagging a question.
    - Parameters:
        - quiz_submission_id (path, required): ID
        - id (path, required): ID
        - attempt (form, required): The attempt number of the quiz submission being taken. Note that this
          must be the latest attempt index, as questions for earlier attempts can
          not be modified.
        - validation_token (form, required): The unique validation token you received when the Quiz Submission was
          created.
        - access_code (form, optional): Access code for the Quiz, if any.

- **PUT** /v1/quiz_submissions/{quiz_submission_id}/questions/{id}/unflag
    - Description: Unflagging a question.
    - Parameters:
        - quiz_submission_id (path, required): ID
        - id (path, required): ID
        - attempt (form, required): The attempt number of the quiz submission being taken. Note that this
          must be the latest attempt index, as questions for earlier attempts can
          not be modified.
        - validation_token (form, required): The unique validation token you received when the Quiz Submission was
          created.
        - access_code (form, optional): Access code for the Quiz, if any.

### Quiz Submission User List

Path: `/quiz_submission_user_list.json`

- **POST** /v1/courses/{course_id}/quizzes/{id}/submission_users/message
    - Description: Send a message to unsubmitted or submitted users for the quiz
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - conversations (form, optional): - Body and recipients to send the message to.

### Quiz Submissions

Path: `/quiz_submissions.json`

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/submissions
    - Description: Get all quiz submissions.
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - include (query, optional): Associations to include with the quiz submission.

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/submission
    - Description: Get the quiz submission.
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - include (query, optional): Associations to include with the quiz submission.

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/submissions/{id}
    - Description: Get a single quiz submission.
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): Associations to include with the quiz submission.

- **POST** /v1/courses/{course_id}/quizzes/{quiz_id}/submissions
    - Description: Create the quiz submission (start a quiz-taking session)
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - access_code (form, optional): Access code for the Quiz, if any.
        - preview (form, optional): Whether this should be a preview QuizSubmission and not count towards
          the user's course record. Teachers only.

- **PUT** /v1/courses/{course_id}/quizzes/{quiz_id}/submissions/{id}
    - Description: Update student question scores and comments.
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID
        - quiz_submissions[attempt] (form, required): The attempt number of the quiz submission that should be updated.
          This
          attempt MUST be already completed.
        - quiz_submissions[fudge_points] (form, optional): Amount of positive or negative points to fudge the total
          score by.
        - quiz_submissions[questions] (form, optional): A set of scores and comments for each question answered by the
          student.
          The keys are the question IDs, and the values are hashes of `score` and
          `comment` entries. See {Appendix: Manual Scoring} for more on this
          parameter.

- **POST** /v1/courses/{course_id}/quizzes/{quiz_id}/submissions/{id}/complete
    - Description: Complete the quiz submission (turn it in).
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID
        - attempt (form, required): The attempt number of the quiz submission that should be completed. Note
          that this must be the latest attempt index, as earlier attempts can not
          be modified.
        - validation_token (form, required): The unique validation token you received when this Quiz Submission was
          created.
        - access_code (form, optional): Access code for the Quiz, if any.

- **GET** /v1/courses/{course_id}/quizzes/{quiz_id}/submissions/{id}/time
    - Description: Get current quiz submission times.
    - Parameters:
        - course_id (path, required): ID
        - quiz_id (path, required): ID
        - id (path, required): ID

### Quizzes

Path: `/quizzes.json`

- **GET** /v1/courses/{course_id}/quizzes
    - Description: List quizzes in a course
    - Parameters:
        - course_id (path, required): ID
        - search_term (query, optional): The partial title of the quizzes to match and return.

- **GET** /v1/courses/{course_id}/quizzes/{id}
    - Description: Get a single quiz
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/quizzes
    - Description: Create a quiz
    - Parameters:
        - course_id (path, required): ID
        - quiz[title] (form, required): The quiz title.
        - quiz[description] (form, optional): A description of the quiz.
        - quiz[quiz_type] (form, optional): The type of quiz.
        - quiz[assignment_group_id] (form, optional): The assignment group id to put the assignment in. Defaults to the
          top
          assignment group in the course. Only valid if the quiz is graded, i.e. if
          quiz_type is "assignment" or "graded_survey".
        - quiz[time_limit] (form, optional): Time limit to take this quiz, in minutes. Set to null for no time limit.
          Defaults to null.
        - quiz[shuffle_answers] (form, optional): If true, quiz answers for multiple choice questions will be randomized
          for
          each student. Defaults to false.
        - quiz[hide_results] (form, optional): Dictates whether or not quiz results are hidden from students.
          If null, students can see their results after any attempt.
          If "always", students can never see their results.
          If "until_after_last_attempt", students can only see results after their
          last attempt. (Only valid if allowed_attempts > 1). Defaults to null.
        - quiz[show_correct_answers] (form, optional): Only valid if hide_results=null
          If false, hides correct answers from students when quiz results are viewed.
          Defaults to true.
        - quiz[show_correct_answers_last_attempt] (form, optional): Only valid if show_correct_answers=true and
          allowed_attempts > 1
          If true, hides correct answers from students when quiz results are viewed
          until they submit the last attempt for the quiz.
          Defaults to false.
        - quiz[show_correct_answers_at] (form, optional): Only valid if show_correct_answers=true
          If set, the correct answers will be visible by students only after this
          date, otherwise the correct answers are visible once the student hands in
          their quiz submission.
        - quiz[hide_correct_answers_at] (form, optional): Only valid if show_correct_answers=true
          If set, the correct answers will stop being visible once this date has
          passed. Otherwise, the correct answers will be visible indefinitely.
        - quiz[allowed_attempts] (form, optional): Number of times a student is allowed to take a quiz.
          Set to -1 for unlimited attempts.
          Defaults to 1.
        - quiz[scoring_policy] (form, optional): Required and only valid if allowed_attempts > 1.
          Scoring policy for a quiz that students can take multiple times.
          Defaults to "keep_highest".
        - quiz[one_question_at_a_time] (form, optional): If true, shows quiz to student one question at a time.
          Defaults to false.
        - quiz[cant_go_back] (form, optional): Only valid if one_question_at_a_time=true
          If true, questions are locked after answering.
          Defaults to false.
        - quiz[access_code] (form, optional): Restricts access to the quiz with a password.
          For no access code restriction, set to null.
          Defaults to null.
        - quiz[ip_filter] (form, optional): Restricts access to the quiz to computers in a specified IP range.
          Filters can be a comma-separated list of addresses, or an address followed by a mask

Examples:
"192.168.217.1"
"192.168.217.1/24"
"192.168.217.1/255.255.255.0"

For no IP filter restriction, set to null.
Defaults to null.
- quiz[due_at] (form, optional): The day/time the quiz is due.
Accepts times in ISO 8601 format, e.g. 2011-10-21T18:48Z.
- quiz[lock_at] (form, optional): The day/time the quiz is locked for students.
Accepts times in ISO 8601 format, e.g. 2011-10-21T18:48Z.
- quiz[unlock_at] (form, optional): The day/time the quiz is unlocked for students.
Accepts times in ISO 8601 format, e.g. 2011-10-21T18:48Z.
- quiz[published] (form, optional): Whether the quiz should have a draft state of published or unpublished.
NOTE: If students have started taking the quiz, or there are any
submissions for the quiz, you may not unpublish a quiz and will recieve
an error.
- quiz[one_time_results] (form, optional): Whether students should be prevented from viewing their quiz results past
the first time (right after they turn the quiz in.)
Only valid if "hide_results" is not set to "always".
Defaults to false.
- quiz[only_visible_to_overrides] (form, optional): Whether this quiz is only visible to overrides (Only useful if
'differentiated assignments' account setting is on)
Defaults to false.

- **PUT** /v1/courses/{course_id}/quizzes/{id}
    - Description: Edit a quiz
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - quiz[notify_of_update] (form, optional): If true, notifies users that the quiz has changed.
          Defaults to true

- **DELETE** /v1/courses/{course_id}/quizzes/{id}
    - Description: Delete a quiz
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/quizzes/{id}/reorder
    - Description: Reorder quiz items
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - order[id] (form, required): The associated item's unique identifier
        - order[type] (form, optional): The type of item is either 'question' or 'group'

- **POST** /v1/courses/{course_id}/quizzes/{id}/validate_access_code
    - Description: Validate quiz access code
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - access_code (form, required): The access code being validated

### Result

Path: `/result.json`

- **GET** /lti/courses/{course_id}/line_items/{line_item_id}/results
    - Description: Show a collection of Results
    - Parameters:
        - course_id (path, required): ID
        - line_item_id (path, required): ID

- **GET** /lti/courses/{course_id}/line_items/{line_item_id}/results/{id}
    - Description: Show a Result
    - Parameters:
        - course_id (path, required): ID
        - line_item_id (path, required): ID
        - id (path, required): ID

### Roles

Path: `/roles.json`

- **GET** /v1/accounts/{account_id}/roles
    - Description: List roles
    - Parameters:
        - account_id (path, required): The id of the account to retrieve roles for.
        - state (query, optional): Filter by role state. If this argument is omitted, only 'active' roles are
          returned.
        - show_inherited (query, optional): If this argument is true, all roles inherited from parent accounts will
          be included.

- **GET** /v1/accounts/{account_id}/roles/{id}
    - Description: Get a single role
    - Parameters:
        - id (path, required): ID
        - account_id (path, required): The id of the account containing the role
        - role_id (query, required): The unique identifier for the role
        - role (query, optional): The name for the role

- **POST** /v1/accounts/{account_id}/roles
    - Description: Create a new role
    - Parameters:
        - account_id (path, required): ID
        - label (form, required): Label for the role.
        - role (form, optional): Deprecated alias for label.
        - base_role_type (form, optional): Specifies the role type that will be used as a base
          for the permissions granted to this role.

Defaults to 'AccountMembership' if absent
- permissions[<X>][explicit] (form, optional): no description
- permissions[<X>][enabled] (form, optional): If explicit is 1 and enabled is 1, permission <X> will be explicitly
granted to this role. If explicit is 1 and enabled has any other value
(typically 0), permission <X> will be explicitly denied to this role. If
explicit is any other value (typically 0) or absent, or if enabled is
absent, the value for permission <X> will be inherited from upstream.
Ignored if permission <X> is locked upstream (in an ancestor account).

May occur multiple times with unique values for <X>. Recognized
permission names for <X> are:

[For Account-Level Roles Only]
become_user -- Users - act as
import_sis -- SIS Data - import
manage_account_memberships -- Admins - add / remove
manage_account_settings -- Account-level settings - manage
manage_alerts -- Global announcements - add / edit / delete
manage_catalog -- Catalog - manage
Manage Course Templates granular permissions
add_course_template -- Course Templates - add
delete_course_template -- Course Templates - delete
edit_course_template -- Course Templates - edit
manage_courses_add -- Courses - add
manage_courses_admin -- Courses - manage / update
manage_developer_keys -- Developer keys - manage
manage_feature_flags -- Feature Options - enable / disable
manage_master_courses -- Blueprint Courses - add / edit / associate / delete
manage_role_overrides -- Permissions - manage
manage_storage_quotas -- Storage Quotas - manage
manage_sis -- SIS data - manage
Manage Temporary Enrollments granular permissions
temporary_enrollments_add -- Temporary Enrollments - add
temporary_enrollments_edit -- Temporary Enrollments - edit
temporary_enrollments_delete -- Temporary Enrollments - delete
manage_user_logins -- Users - manage login details
manage_user_observers -- Users - manage observers
moderate_user_content -- Users - moderate content
read_course_content -- Course Content - view
read_course_list -- Courses - view list
view_course_changes -- Courses - view change logs
view_feature_flags -- Feature Options - view
view_grade_changes -- Grades - view change logs
view_notifications -- Notifications - view
view_quiz_answer_audits -- Quizzes - view submission log
view_statistics -- Statistics - view
undelete_courses -- Courses - undelete

[For both Account-Level and Course-Level roles]
Note: Applicable enrollment types for course-level roles are given in brackets:
S = student, T = teacher (instructor), A = TA, D = designer, O = observer.
Lower-case letters indicate permissions that are off by default.
A missing letter indicates the permission cannot be enabled for the role
or any derived custom roles.
allow_course_admin_actions -- [ Tad ] Users - allow administrative actions in courses
create_collaborations -- [STADo] Student Collaborations - create
create_conferences -- [STADo] Web conferences - create
create_forum -- [STADo] Discussions - create
generate_observer_pairing_code -- [ tado] Users - Generate observer pairing codes for students
import_outcomes -- [ TaDo] Learning Outcomes - import
lti_add_edit -- [ TAD ] LTI - add / edit / delete
manage_account_banks -- [ td  ] Item Banks - manage account
share_banks_with_subaccounts -- [ tad ] Item Banks - share with subaccounts
manage_assignments -- [ TADo] Assignments and Quizzes - add / edit / delete (deprecated)
Manage Assignments and Quizzes granular permissions
manage_assignments_add -- [ TADo] Assignments and Quizzes - add
manage_assignments_edit -- [ TADo] Assignments and Quizzes - edit / manage
manage_assignments_delete -- [ TADo] Assignments and Quizzes - delete
manage_calendar -- [sTADo] Course Calendar - add / edit / delete
manage_content -- [ TADo] Course Content - add / edit / delete
manage_course_visibility -- [ TAD ] Course - change visibility
Manage Courses granular permissions
manage_courses_conclude -- [ TaD ] Courses - conclude
manage_courses_delete -- [ TaD ] Courses - delete
manage_courses_publish -- [ TaD ] Courses - publish
manage_courses_reset -- [ TaD ] Courses - reset
Manage Files granular permissions
manage_files_add -- [ TADo] Course Files - add
manage_files_edit -- [ TADo] Course Files - edit
manage_files_delete -- [ TADo] Course Files - delete
manage_grades -- [ TA  ] Grades - edit
Manage Groups granular permissions
manage_groups_add -- [ TAD ] Groups - add
manage_groups_delete -- [ TAD ] Groups - delete
manage_groups_manage -- [ TAD ] Groups - manage
manage_interaction_alerts -- [ Ta  ] Alerts - add / edit / delete
manage_outcomes -- [sTaDo] Learning Outcomes - add / edit / delete
manage_proficiency_calculations -- [ t d ] Outcome Proficiency Calculations - add / edit / delete
manage_proficiency_scales -- [ t d ] Outcome Proficiency/Mastery Scales - add / edit / delete
Manage Sections granular permissions
manage_sections_add -- [ TaD ] Course Sections - add
manage_sections_edit -- [ TaD ] Course Sections - edit
manage_sections_delete -- [ TaD ] Course Sections - delete
manage_students -- [ TAD ] Users - manage students in courses
manage_rubrics -- [ TAD ] Rubrics - add / edit / delete
Manage Pages granular permissions
manage_wiki_create -- [ TADo] Pages - create
manage_wiki_delete -- [ TADo] Pages - delete
manage_wiki_update -- [ TADo] Pages - update
moderate_forum -- [sTADo] Discussions - moderate
post_to_forum -- [STADo] Discussions - post
read_announcements -- [STADO] Announcements - view
read_email_addresses -- [sTAdo] Users - view primary email address
read_forum -- [STADO] Discussions - view
read_question_banks -- [ TADo] Question banks - view and link
read_reports -- [ TAD ] Reports - manage
read_roster -- [STADo] Users - view list
read_sis -- [sTa  ] SIS Data - read
select_final_grade -- [ TA  ] Grades - select final grade for moderation
send_messages -- [STADo] Conversations - send messages to individual course members
send_messages_all -- [sTADo] Conversations - send messages to entire class
Users - Teacher granular permissions
add_teacher_to_course -- [ Tad ] Add a teacher enrollment to a course
remove_teacher_from_course -- [ Tad ] Remove a Teacher enrollment from a course
Users - TA granular permissions
add_ta_to_course -- [ Tad ] Add a TA enrollment to a course
remove_ta_from_course -- [ Tad ] Remove a TA enrollment from a course
Users - Designer granular permissions
add_designer_to_course -- [ Tad ] Add a designer enrollment to a course
remove_designer_from_course -- [ Tad ] Remove a designer enrollment from a course
Users - Observer granular permissions
add_observer_to_course -- [ Tad ] Add an observer enrollment to a course
remove_observer_from_course -- [ Tad ] Remove an observer enrollment from a course
Users - Student granular permissions
add_student_to_course -- [ Tad ] Add a student enrollment to a course
remove_student_from_course -- [ Tad ] Remove a student enrollment from a course
view_all_grades -- [ TAd ] Grades - view all grades
view_analytics -- [sTA  ] Analytics - view pages
view_audit_trail -- [ t   ] Grades - view audit trail
view_group_pages -- [sTADo] Groups - view all student groups
view_user_logins -- [ TA  ] Users - view login IDs

Some of these permissions are applicable only for roles on the site admin
account, on a root account, or for course-level roles with a particular base role type;
if a specified permission is inapplicable, it will be ignored.

Additional permissions may exist based on installed plugins.

A comprehensive list of all permissions are available:

Course Permissions PDF: http://bit.ly/cnvs-course-permissions

Account Permissions PDF: http://bit.ly/cnvs-acct-permissions
- permissions[<X>][locked] (form, optional): If the value is 1, permission <X> will be locked downstream (new roles in
subaccounts cannot override the setting). For any other value, permission
<X> is left unlocked. Ignored if permission <X> is already locked
upstream. May occur multiple times with unique values for <X>.
- permissions[<X>][applies_to_self] (form, optional): If the value is 1, permission <X> applies to the account this role
is in.
The default value is 1. Must be true if applies_to_descendants is false.
This value is only returned if enabled is true.
- permissions[<X>][applies_to_descendants] (form, optional): If the value is 1, permission <X> cascades down to sub
accounts of the
account this role is in. The default value is 1. Must be true if
applies_to_self is false.This value is only returned if enabled is true.

- **DELETE** /v1/accounts/{account_id}/roles/{id}
    - Description: Deactivate a role
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - role_id (query, required): The unique identifier for the role
        - role (query, optional): The name for the role

- **POST** /v1/accounts/{account_id}/roles/{id}/activate
    - Description: Activate a role
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - role_id (form, required): The unique identifier for the role
        - role (form, optional): The name for the role

- **PUT** /v1/accounts/{account_id}/roles/{id}
    - Description: Update a role
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - label (form, optional): The label for the role. Can only change the label of a custom role that belongs
          directly to the account.
        - permissions[<X>][explicit] (form, optional): no description
        - permissions[<X>][enabled] (form, optional): These arguments are described in the documentation for the
          {api:RoleOverridesController#add_role add_role method}.
        - permissions[<X>][applies_to_self] (form, optional): If the value is 1, permission <X> applies to the account
          this role is in.
          The default value is 1. Must be true if applies_to_descendants is false.
          This value is only returned if enabled is true.
        - permissions[<X>][applies_to_descendants] (form, optional): If the value is 1, permission <X> cascades down to
          sub accounts of the
          account this role is in. The default value is 1. Must be true if
          applies_to_self is false.This value is only returned if enabled is true.

### Rubrics

Path: `/rubrics.json`

- **POST** /v1/courses/{course_id}/rubrics
    - Description: Create a single rubric
    - Parameters:
        - course_id (path, required): ID
        - id (form, optional): The id of the rubric
        - rubric_association_id (form, optional): The id of the object with which this rubric is associated
        - rubric[title] (form, optional): The title of the rubric
        - rubric[free_form_criterion_comments] (form, optional): Whether or not you can write custom comments in the
          ratings field for a rubric
        - rubric_association[association_id] (form, optional): The id of the object with which this rubric is associated
        - rubric_association[association_type] (form, optional): The type of object this rubric is associated with
        - rubric_association[use_for_grading] (form, optional): Whether or not the associated rubric is used for grade
          calculation
        - rubric_association[hide_score_total] (form, optional): Whether or not the score total is displayed within the
          rubric.
          This option is only available if the rubric is not used for grading.
        - rubric_association[purpose] (form, optional): Whether or not the association is for grading (and thus linked
          to an assignment)
          or if it's to indicate the rubric should appear in its context
        - rubric[criteria] (form, optional): An indexed Hash of RubricCriteria objects where the keys are integer ids
          and the values are the RubricCriteria objects

- **PUT** /v1/courses/{course_id}/rubrics/{id}
    - Description: Update a single rubric
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): The id of the rubric
        - rubric_association_id (form, optional): The id of the object with which this rubric is associated
        - rubric[title] (form, optional): The title of the rubric
        - rubric[free_form_criterion_comments] (form, optional): Whether or not you can write custom comments in the
          ratings field for a rubric
        - rubric[skip_updating_points_possible] (form, optional): Whether or not to update the points possible
        - rubric_association[association_id] (form, optional): The id of the object with which this rubric is associated
        - rubric_association[association_type] (form, optional): The type of object this rubric is associated with
        - rubric_association[use_for_grading] (form, optional): Whether or not the associated rubric is used for grade
          calculation
        - rubric_association[hide_score_total] (form, optional): Whether or not the score total is displayed within the
          rubric.
          This option is only available if the rubric is not used for grading.
        - rubric_association[purpose] (form, optional): Whether or not the association is for grading (and thus linked
          to an assignment)
          or if it's to indicate the rubric should appear in its context
        - rubric[criteria] (form, optional): An indexed Hash of RubricCriteria objects where the keys are integer ids
          and the values are the RubricCriteria objects

- **DELETE** /v1/courses/{course_id}/rubrics/{id}
    - Description: Delete a single rubric
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/rubrics
    - Description: List rubrics
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/courses/{course_id}/rubrics
    - Description: List rubrics
    - Parameters:
        - course_id (path, required): ID

- **GET** /v1/accounts/{account_id}/rubrics/{id}
    - Description: Get a single rubric
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): Related records to include in the response.
        - style (query, optional): Applicable only if assessments are being returned. If included, returns either all
          criteria data associated with the assessment, or just the comments. If not included, both data and comments
          are omitted.

- **GET** /v1/courses/{course_id}/rubrics/{id}
    - Description: Get a single rubric
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): Related records to include in the response.
        - style (query, optional): Applicable only if assessments are being returned. If included, returns either all
          criteria data associated with the assessment, or just the comments. If not included, both data and comments
          are omitted.

- **GET** /v1/courses/{course_id}/rubrics/{id}/used_locations
    - Description: Get the courses and assignments for
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/rubrics/{id}/used_locations
    - Description: Get the courses and assignments for
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/rubrics/upload
    - Description: Creates a rubric using a CSV file
    - Parameters:
        - course_id (path, required): ID

- **POST** /v1/accounts/{account_id}/rubrics/upload
    - Description: Creates a rubric using a CSV file
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/rubrics/upload_template
    - Description: Templated file for importing a rubric

- **GET** /v1/courses/{course_id}/rubrics/upload/{id}
    - Description: Get the status of a rubric import
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/rubrics/upload/{id}
    - Description: Get the status of a rubric import
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/rubric_associations/{rubric_association_id}/rubric_assessments
    - Description: Create a single rubric assessment
    - Parameters:
        - course_id (path, required): The id of the course
        - rubric_association_id (path, required): The id of the object with which this rubric assessment is associated
        - provisional (form, optional): (optional) Indicates whether this assessment is provisional, defaults to false.
        - final (form, optional): (optional) Indicates a provisional grade will be marked as final. It only takes effect
          if the provisional param is passed as true. Defaults to false.
        - graded_anonymously (form, optional): (optional) Defaults to false
        - rubric_assessment (form, optional): A Hash of data to complement the rubric assessment:
          The user id that refers to the person being assessed
          rubric_assessment[user_id]
          Assessment type. There are only three valid types:  'grading', 'peer_review', or 'provisional_grade'
          rubric_assessment[assessment_type]
          The points awarded for this row.
          rubric_assessment[criterion_id][points]
          Comments to add for this row.
          rubric_assessment[criterion_id][comments]
          For each criterion_id, change the id by the criterion number, ex: criterion_123
          If the criterion_id is not specified it defaults to false, and nothing is updated.

- **PUT** /v1/courses/{course_id}/rubric_associations/{rubric_association_id}/rubric_assessments/{id}
    - Description: Update a single rubric assessment
    - Parameters:
        - id (path, required): The id of the rubric assessment
        - course_id (path, required): The id of the course
        - rubric_association_id (path, required): The id of the object with which this rubric assessment is associated
        - provisional (form, optional): (optional) Indicates whether this assessment is provisional, defaults to false.
        - final (form, optional): (optional) Indicates a provisional grade will be marked as final. It only takes effect
          if the provisional param is passed as true. Defaults to false.
        - graded_anonymously (form, optional): (optional) Defaults to false
        - rubric_assessment (form, optional): A Hash of data to complement the rubric assessment:
          The user id that refers to the person being assessed
          rubric_assessment[user_id]
          Assessment type. There are only three valid types:  'grading', 'peer_review', or 'provisional_grade'
          rubric_assessment[assessment_type]
          The points awarded for this row.
          rubric_assessment[criterion_id][points]
          Comments to add for this row.
          rubric_assessment[criterion_id][comments]
          For each criterion_id, change the id by the criterion number, ex: criterion_123
          If the criterion_id is not specified it defaults to false, and nothing is updated.

- **DELETE** /v1/courses/{course_id}/rubric_associations/{rubric_association_id}/rubric_assessments/{id}
    - Description: Delete a single rubric assessment
    - Parameters:
        - course_id (path, required): ID
        - rubric_association_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/rubric_associations
    - Description: Create a RubricAssociation
    - Parameters:
        - course_id (path, required): ID
        - rubric_association[rubric_id] (form, optional): The id of the Rubric
        - rubric_association[association_id] (form, optional): The id of the object with which this rubric is associated
        - rubric_association[association_type] (form, optional): The type of object this rubric is associated with
        - rubric_association[title] (form, optional): The name of the object this rubric is associated with
        - rubric_association[use_for_grading] (form, optional): Whether or not the associated rubric is used for grade
          calculation
        - rubric_association[hide_score_total] (form, optional): Whether or not the score total is displayed within the
          rubric.
          This option is only available if the rubric is not used for grading.
        - rubric_association[purpose] (form, optional): Whether or not the association is for grading (and thus linked
          to an assignment)
          or if it's to indicate the rubric should appear in its context
        - rubric_association[bookmarked] (form, optional): Whether or not the associated rubric appears in its context

- **PUT** /v1/courses/{course_id}/rubric_associations/{id}
    - Description: Update a RubricAssociation
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): The id of the RubricAssociation to update
        - rubric_association[rubric_id] (form, optional): The id of the Rubric
        - rubric_association[association_id] (form, optional): The id of the object with which this rubric is associated
        - rubric_association[association_type] (form, optional): The type of object this rubric is associated with
        - rubric_association[title] (form, optional): The name of the object this rubric is associated with
        - rubric_association[use_for_grading] (form, optional): Whether or not the associated rubric is used for grade
          calculation
        - rubric_association[hide_score_total] (form, optional): Whether or not the score total is displayed within the
          rubric.
          This option is only available if the rubric is not used for grading.
        - rubric_association[purpose] (form, optional): Whether or not the association is for grading (and thus linked
          to an assignment)
          or if it's to indicate the rubric should appear in its context
        - rubric_association[bookmarked] (form, optional): Whether or not the associated rubric appears in its context

- **DELETE** /v1/courses/{course_id}/rubric_associations/{id}
    - Description: Delete a RubricAssociation
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID

### Score

Path: `/score.json`

- **POST** /lti/courses/{course_id}/line_items/{line_item_id}/scores
    - Description: Create a Score
    - Parameters:
        - course_id (path, required): ID
        - line_item_id (path, required): ID
        - userId (form, required): The lti_user_id or the Canvas user_id.
          Returns a 422 if user not found in Canvas or is not a student.
        - activityProgress (form, required): Indicate to Canvas the status of the user towards the activity's
          completion.
          Must be one of Initialized, Started, InProgress, Submitted, Completed.
        - gradingProgress (form, required): Indicate to Canvas the status of the grading process.
          A value of PendingManual will require intervention by a grader.
          Values of NotReady, Failed, and Pending will cause the scoreGiven to be ignored.
          FullyGraded values will require no action.
          Possible values are NotReady, Failed, Pending, PendingManual, FullyGraded.
        - timestamp (form, required): Date and time when the score was modified in the tool. Should use
          ISO8601-formatted date with subsecond precision.
          Returns a 400 if the timestamp is earlier than the updated_at time of the Result.
        - scoreGiven (form, optional): The Current score received in the tool for this line item and user,
          scaled to the scoreMaximum
        - scoreMaximum (form, optional): Maximum possible score for this result; it must be present if scoreGiven is
          present.
          Returns 422 if not present when scoreGiven is present.
        - comment (form, optional): Comment visible to the student about this score.
        - submission (form, optional): Contains metadata about the submission attempt. Supported fields listed below.
        - submission[submittedAt] (form, optional): Date and time that the submission was originally created. Should use
          ISO8601-formatted date with subsecond precision.
        - https://canvas.instructure.com/lti/submission (form, optional): (EXTENSION) Optional submission type and data.
          Fields listed below.
        - https://canvas.instructure.com/lti/submission[new_submission] (form, optional): (EXTENSION field) flag to
          indicate that this is a new submission. Defaults to true unless submission_type is none.
        - https://canvas.instructure.com/lti/submission[preserve_score] (form, optional): (EXTENSION field) flag to
          prevent a request from clearing an existing grade for a submission. Defaults to false.
        - https://canvas.instructure.com/lti/submission[prioritize_non_tool_grade] (form, optional): (EXTENSION field)
          flag to prevent a request from overwriting an existing grade for a submission. Defaults to false.
        - https://canvas.instructure.com/lti/submission[submission_type] (form, optional): (EXTENSION field) permissible
          values are: none, basic_lti_launch, online_text_entry, external_tool, online_upload, or online_url. Defaults
          to external_tool. Ignored if content_items are provided.
        - https://canvas.instructure.com/lti/submission[submission_data] (form, optional): (EXTENSION field) submission
          data (URL or body text). Only used for submission_types basic_lti_launch, online_text_entry, online_url.
          Ignored if content_items are provided.
        - https://canvas.instructure.com/lti/submission[submitted_at] (form, optional): (EXTENSION field) Date and time
          that the submission was originally created. Should use ISO8601-formatted date with subsecond precision. This
          should match the date and time that the original submission happened in Canvas. Use of submission.submittedAt
          is preferred.
        - https://canvas.instructure.com/lti/submission[content_items] (form, optional): (EXTENSION field) Files that
          should be included with the submission. Each item should contain `type: file`, and a url pointing to the file.
          It can also contain a title, and an explicit MIME type if needed (otherwise, MIME type will be inferred from
          the title or url). If any items are present, submission_type will be online_upload.

### Search

Path: `/search.json`

- **GET** /v1/conversations/find_recipients
    - Description: Find recipients
    - Parameters:
        - search (query, optional): Search terms used for matching users/courses/groups (e.g. "bob smith"). If
          multiple terms are given (separated via whitespace), only results matching
          all terms will be returned.
        - context (query, optional): Limit the search to a particular course/group (e.g. "course_3" or "group_4").
        - exclude (query, optional): Array of ids to exclude from the search. These may be user ids or
          course/group ids prefixed with "course_" or "group_" respectively,
          e.g. exclude[]=1&exclude[]=2&exclude[]=course_3
        - type (query, optional): Limit the search just to users or contexts (groups/courses).
        - user_id (query, optional): Search for a specific user id. This ignores the other above parameters,
          and will never return more than one result.
        - from_conversation_id (query, optional): When searching by user_id, only users that could be normally messaged
          by
          this user will be returned. This parameter allows you to specify a
          conversation that will be referenced for a shared context -- if both the
          current user and the searched user are in the conversation, the user will
          be returned. This is used to start new side conversations.
        - permissions (query, optional): Array of permission strings to be checked for each matched context (e.g.
          "send_messages"). This argument determines which permissions may be
          returned in the response; it won't prevent contexts from being returned if
          they don't grant the permission(s).

- **GET** /v1/search/recipients
    - Description: Find recipients
    - Parameters:
        - search (query, optional): Search terms used for matching users/courses/groups (e.g. "bob smith"). If
          multiple terms are given (separated via whitespace), only results matching
          all terms will be returned.
        - context (query, optional): Limit the search to a particular course/group (e.g. "course_3" or "group_4").
        - exclude (query, optional): Array of ids to exclude from the search. These may be user ids or
          course/group ids prefixed with "course_" or "group_" respectively,
          e.g. exclude[]=1&exclude[]=2&exclude[]=course_3
        - type (query, optional): Limit the search just to users or contexts (groups/courses).
        - user_id (query, optional): Search for a specific user id. This ignores the other above parameters,
          and will never return more than one result.
        - from_conversation_id (query, optional): When searching by user_id, only users that could be normally messaged
          by
          this user will be returned. This parameter allows you to specify a
          conversation that will be referenced for a shared context -- if both the
          current user and the searched user are in the conversation, the user will
          be returned. This is used to start new side conversations.
        - permissions (query, optional): Array of permission strings to be checked for each matched context (e.g.
          "send_messages"). This argument determines which permissions may be
          returned in the response; it won't prevent contexts from being returned if
          they don't grant the permission(s).

- **GET** /v1/search/all_courses
    - Description: List all courses
    - Parameters:
        - search (query, optional): Search terms used for matching users/courses/groups (e.g. "bob smith"). If
          multiple terms are given (separated via whitespace), only results matching
          all terms will be returned.
        - public_only (query, optional): Only return courses with public content. Defaults to false.
        - open_enrollment_only (query, optional): Only return courses that allow self enrollment. Defaults to false.

### Sections

Path: `/sections.json`

- **GET** /v1/courses/{course_id}/sections
    - Description: List course sections
    - Parameters:
        - course_id (path, required): ID
        - include (query, optional): - "students": Associations to include with the group. Note: this is only
          available if you have permission to view users or grades in the course
- "avatar_url": Include the avatar URLs for students returned.
- "enrollments": If 'students' is also included, return the section
  enrollment for each student
- "total_students": Returns the total amount of active and invited students
  for the course section
- "passback_status": Include the grade passback status.
- "permissions": Include whether section grants :manage_calendar permission
  to the caller
    - search_term (query, optional): When included, searches course sections for the term. Returns only matching
      results. Term must be at least 2 characters.

- **POST** /v1/courses/{course_id}/sections
    - Description: Create course section
    - Parameters:
        - course_id (path, required): ID
        - course_section[name] (form, optional): The name of the section
        - course_section[sis_section_id] (form, optional): The sis ID of the section. Must have manage_sis permission to
          set. This is ignored if caller does not have permission to set.
        - course_section[integration_id] (form, optional): The integration_id of the section. Must have manage_sis
          permission to set. This is ignored if caller does not have permission to set.
        - course_section[start_at] (form, optional): Section start date in ISO8601 format, e.g. 2011-01-01T01:00Z
        - course_section[end_at] (form, optional): Section end date in ISO8601 format. e.g. 2011-01-01T01:00Z
        - course_section[restrict_enrollments_to_section_dates] (form, optional): Set to true to restrict user
          enrollments to the start and end dates of the section.
        - enable_sis_reactivation (form, optional): When true, will first try to re-activate a deleted section with
          matching sis_section_id if possible.

- **POST** /v1/sections/{id}/crosslist/{new_course_id}
    - Description: Cross-list a Section
    - Parameters:
        - id (path, required): ID
        - new_course_id (path, required): ID
        - override_sis_stickiness (form, optional): Default is true. If false, any fields containing “sticky” changes
          will not be updated.
          See SIS CSV Format documentation for information on which fields can have SIS stickiness

- **DELETE** /v1/sections/{id}/crosslist
    - Description: De-cross-list a Section
    - Parameters:
        - id (path, required): ID
        - override_sis_stickiness (query, optional): Default is true. If false, any fields containing “sticky” changes
          will not be updated.
          See SIS CSV Format documentation for information on which fields can have SIS stickiness

- **PUT** /v1/sections/{id}
    - Description: Edit a section
    - Parameters:
        - id (path, required): ID
        - course_section[name] (form, optional): The name of the section
        - course_section[sis_section_id] (form, optional): The sis ID of the section. Must have manage_sis permission to
          set.
        - course_section[integration_id] (form, optional): The integration_id of the section. Must have manage_sis
          permission to set.
        - course_section[start_at] (form, optional): Section start date in ISO8601 format, e.g. 2011-01-01T01:00Z
        - course_section[end_at] (form, optional): Section end date in ISO8601 format. e.g. 2011-01-01T01:00Z
        - course_section[restrict_enrollments_to_section_dates] (form, optional): Set to true to restrict user
          enrollments to the start and end dates of the section.
        - override_sis_stickiness (form, optional): Default is true. If false, any fields containing “sticky” changes
          will not be updated.
          See SIS CSV Format documentation for information on which fields can have SIS stickiness

- **GET** /v1/courses/{course_id}/sections/{id}
    - Description: Get section information
    - Parameters:
        - course_id (path, required): ID
        - id (path, required): ID
        - include (query, optional): - "students": Associations to include with the group. Note: this is only
          available if you have permission to view users or grades in the course
- "avatar_url": Include the avatar URLs for students returned.
- "enrollments": If 'students' is also included, return the section
  enrollment for each student
- "total_students": Returns the total amount of active and invited students
  for the course section
- "passback_status": Include the grade passback status.
- "permissions": Include whether section grants :manage_calendar permission
  to the caller

- **GET** /v1/sections/{id}
    - Description: Get section information
    - Parameters:
        - id (path, required): ID
        - include (query, optional): - "students": Associations to include with the group. Note: this is only
          available if you have permission to view users or grades in the course
- "avatar_url": Include the avatar URLs for students returned.
- "enrollments": If 'students' is also included, return the section
  enrollment for each student
- "total_students": Returns the total amount of active and invited students
  for the course section
- "passback_status": Include the grade passback status.
- "permissions": Include whether section grants :manage_calendar permission
  to the caller

- **DELETE** /v1/sections/{id}
    - Description: Delete a section
    - Parameters:
        - id (path, required): ID

### Services

Path: `/services.json`

- **GET** /v1/services/kaltura
    - Description: Get Kaltura config

- **POST** /v1/services/kaltura_session
    - Description: Start Kaltura session

### Shared Brand Configs

Path: `/shared_brand_configs.json`

- **POST** /v1/accounts/{account_id}/shared_brand_configs
    - Description: Share a BrandConfig (Theme)
    - Parameters:
        - account_id (path, required): ID
        - shared_brand_config[name] (form, required): Name to share this BrandConfig (theme) as.
        - shared_brand_config[brand_config_md5] (form, required): MD5 of brand_config to share

- **PUT** /v1/accounts/{account_id}/shared_brand_configs/{id}
    - Description: Update a shared theme
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **DELETE** /v1/shared_brand_configs/{id}
    - Description: Un-share a BrandConfig (Theme)
    - Parameters:
        - id (path, required): ID

### SIS Import Errors

Path: `/sis_import_errors.json`

- **GET** /v1/accounts/{account_id}/sis_imports/{id}/errors
    - Description: Get SIS import error list
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - failure (query, optional): If set, only shows errors on a sis import that would cause a failure.

- **GET** /v1/accounts/{account_id}/sis_import_errors
    - Description: Get SIS import error list
    - Parameters:
        - account_id (path, required): ID
        - failure (query, optional): If set, only shows errors on a sis import that would cause a failure.

### SIS Imports

Path: `/sis_imports.json`

- **GET** /v1/accounts/{account_id}/sis_imports
    - Description: Get SIS import list
    - Parameters:
        - account_id (path, required): ID
        - created_since (query, optional): If set, only shows imports created after the specified date (use ISO8601
          format)
        - created_before (query, optional): If set, only shows imports created before the specified date (use ISO8601
          format)
        - workflow_state (query, optional): If set, only returns imports that are in the given state.

- **GET** /v1/accounts/{account_id}/sis_imports/importing
    - Description: Get the current importing SIS import
    - Parameters:
        - account_id (path, required): ID

- **POST** /v1/accounts/{account_id}/sis_imports
    - Description: Import SIS data
    - Parameters:
        - account_id (path, required): ID
        - import_type (form, optional): Choose the data format for reading SIS data. With a standard Canvas
          install, this option can only be 'instructure_csv', and if unprovided,
          will be assumed to be so. Can be part of the query string.
        - attachment (form, optional): There are two ways to post SIS import data - either via a
          multipart/form-data form-field-style attachment, or via a non-multipart
          raw post request.

'attachment' is required for multipart/form-data style posts. Assumed to
be SIS data from a file upload form field named 'attachment'.

Examples:
curl -F attachment=@<filename> -H "Authorization: Bearer <token>" \
https://<canvas>/api/v1/accounts/<account_id>/sis_imports.json?import_type=instructure_csv

If you decide to do a raw post, you can skip the 'attachment' argument,
but you will then be required to provide a suitable Content-Type header.
You are encouraged to also provide the 'extension' argument.

Examples:
curl -H 'Content-Type: application/octet-stream' --data-binary @<filename>.zip \
-H "Authorization: Bearer <token>" \
https://<canvas>/api/v1/accounts/<account_id>/sis_imports.json?import_type=instructure_csv&extension=zip

curl -H 'Content-Type: application/zip' --data-binary @<filename>.zip \
-H "Authorization: Bearer <token>" \
https://<canvas>/api/v1/accounts/<account_id>/sis_imports.json?import_type=instructure_csv

curl -H 'Content-Type: text/csv' --data-binary @<filename>.csv \
-H "Authorization: Bearer <token>" \
https://<canvas>/api/v1/accounts/<account_id>/sis_imports.json?import_type=instructure_csv

curl -H 'Content-Type: text/csv' --data-binary @<filename>.csv \
-H "Authorization: Bearer <token>" \
https://<canvas>/api/v1/accounts/<account_id>
/sis_imports.json?import_type=instructure_csv&batch_mode=1&batch_mode_term_id=15

If the attachment is a zip file, the uncompressed file(s) cannot be 100x larger than the zip, or the import will fail.
For example, if the zip file is 1KB but the total size of the uncompressed file(s) is 100KB or greater the import will
fail. There is a hard cap of 50 GB.
- extension (form, optional): Recommended for raw post request style imports. This field will be used to
distinguish between zip, xml, csv, and other file format extensions that
would usually be provided with the filename in the multipart post request
scenario. If not provided, this value will be inferred from the
Content-Type, falling back to zip-file format if all else fails.
- batch_mode (form, optional): If set, this SIS import will be run in batch mode, deleting any data
previously imported via SIS that is not present in this latest import.
See the SIS CSV Format page for details.
Batch mode cannot be used with diffing.
- batch_mode_term_id (form, optional): Limit deletions to only this term. Required if batch mode is enabled.
- multi_term_batch_mode (form, optional): Runs batch mode against all terms in terms file. Requires change_threshold.
- skip_deletes (form, optional): When set the import will skip any deletes. This does not account for
objects that are deleted during the batch mode cleanup process.
- override_sis_stickiness (form, optional): Default is false. If true, any fields containing “sticky” or UI changes will
be overridden.
See SIS CSV Format documentation for information on which fields can have SIS stickiness
- add_sis_stickiness (form, optional): This option, if present, will process all changes as if they were UI
changes. This means that "stickiness" will be added to changed fields.
This option is only processed if 'override_sis_stickiness' is also provided.
- clear_sis_stickiness (form, optional): This option, if present, will clear "stickiness" from all fields touched
by this import. Requires that 'override_sis_stickiness' is also provided.
If 'add_sis_stickiness' is also provided, 'clear_sis_stickiness' will
overrule the behavior of 'add_sis_stickiness'
- update_sis_id_if_login_claimed (form, optional): This option, if present, will override the old (or non-existent)
non-matching SIS ID with the new SIS ID in the upload,
if a pseudonym is found from the login field and the SIS ID doesn't match.
- diffing_data_set_identifier (form, optional): If set on a CSV import, Canvas will attempt to optimize the SIS import
by
comparing this set of CSVs to the previous set that has the same data set
identifier, and only applying the difference between the two. See the
SIS CSV Format documentation for more details.
Diffing cannot be used with batch_mode
- diffing_remaster_data_set (form, optional): If true, and diffing_data_set_identifier is sent, this SIS import will be
part of the data set, but diffing will not be performed. See the SIS CSV
Format documentation for details.
- diffing_drop_status (form, optional): If diffing_drop_status is passed, this SIS import will use this status for
enrollments that are not included in the sis_batch. Defaults to 'deleted'
- diffing_user_remove_status (form, optional): For users removed from one batch to the next one using the same
diffing_data_set_identifier, set their status to the value of this argument.
Defaults to 'deleted'.
- batch_mode_enrollment_drop_status (form, optional): If batch_mode_enrollment_drop_status is passed, this SIS import
will use
this status for enrollments that are not included in the sis_batch. This
will have an effect if multi_term_batch_mode is set. Defaults to 'deleted'
This will still mark courses and sections that are not included in the
sis_batch as deleted, and subsequently enrollments in the deleted courses
and sections as deleted.
- change_threshold (form, optional): If set with batch_mode, the batch cleanup process will not run if the
number of items deleted is higher than the percentage set. If set to 10
and a term has 200 enrollments, and batch would delete more than 20 of
the enrollments the batch will abort before the enrollments are deleted.
The change_threshold will be evaluated for course, sections, and
enrollments independently.
If set with diffing, diffing will not be performed if the files are
greater than the threshold as a percent. If set to 5 and the file is more
than 5% smaller or more than 5% larger than the file that is being
compared to, diffing will not be performed. If the files are less than 5%,
diffing will be performed. The way the percent is calculated is by taking
the size of the current import and dividing it by the size of the previous
import. The formula used is:
|(1 - current_file_size / previous_file_size)| * 100
See the SIS CSV Format documentation for more details.
Required for multi_term_batch_mode.
- diff_row_count_threshold (form, optional): If set with diffing, diffing will not be performed if the number of rows
to be run in the fully calculated diff import exceeds the threshold.

- **GET** /v1/accounts/{account_id}/sis_imports/{id}
    - Description: Get SIS import status
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/accounts/{account_id}/sis_imports/{id}/restore_states
    - Description: Restore workflow_states of SIS imported items
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID
        - batch_mode (form, optional): If set, will only restore items that were deleted from batch_mode.
        - undelete_only (form, optional): If set, will only restore items that were deleted. This will ignore any
          items that were created or modified.
        - unconclude_only (form, optional): If set, will only restore enrollments that were concluded. This will
          ignore any items that were created or deleted.

- **PUT** /v1/accounts/{account_id}/sis_imports/{id}/abort
    - Description: Abort SIS import
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **PUT** /v1/accounts/{account_id}/sis_imports/abort_all_pending
    - Description: Abort all pending SIS imports
    - Parameters:
        - account_id (path, required): ID

### SIS Integration

Path: `/sis_integration.json`

- **GET** /sis/accounts/{account_id}/assignments
    - Description: Retrieve assignments enabled for grade export to SIS
    - Parameters:
        - account_id (path, required): The ID of the account to query.
        - course_id (query, optional): The ID of the course to query.
        - starts_before (query, optional): When searching on an account,
        - ends_after (query, optional): When searching on an account,
        - include (query, optional): Array of additional

- **GET** /sis/courses/{course_id}/assignments
    - Description: Retrieve assignments enabled for grade export to SIS
    - Parameters:
        - account_id (query, optional): The ID of the account to query.
        - course_id (path, required): The ID of the course to query.
        - starts_before (query, optional): When searching on an account,
        - ends_after (query, optional): When searching on an account,
        - include (query, optional): Array of additional

- **PUT** /sis/courses/{course_id}/disable_post_to_sis
    - Description: Disable assignments currently enabled for grade export to SIS
    - Parameters:
        - course_id (path, required): The ID of the course.
        - grading_period_id (form, optional): The ID of the grading period.

### Smart Search

Path: `/smart_search.json`

- **GET** /v1/courses/{course_id}/smartsearch
    - Description: Search course content
    - Parameters:
        - course_id (path, required): ID
        - q (query, required): The search query
        - filter (query, optional): Types of objects to search. By default, all supported types are searched. Supported
          types
          include +pages+, +assignments+, +announcements+, and +discussion_topics+.

### Submission Comments

Path: `/submission_comments.json`

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/comments/{id}
    - Description: Edit a submission comment
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID
        - id (path, required): ID
        - comment (form, optional): If this argument is present, edit the text of a comment.

- **DELETE** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/comments/{id}
    - Description: Delete a submission comment
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID
        - id (path, required): ID

- **POST** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/comments/files
    - Description: Upload a file
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

### Submissions

Path: `/submissions.json`

- **POST** /v1/courses/{course_id}/assignments/{assignment_id}/submissions
    - Description: Submit an assignment
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - comment[text_comment] (form, optional): Include a textual comment with the submission.
        - submission[group_comment] (form, optional): Whether or not this comment should be sent to the entire group (
          defaults
          to false). Ignored if this is not a group assignment or if no text_comment
          is provided.
        - submission[submission_type] (form, required): The type of submission being made. The assignment
          submission_types must
          include this submission type as an allowed option, or the submission will be rejected with a 400 error.

The submission_type given determines which of the following parameters is
used. For instance, to submit a URL, submission [submission_type] must be
set to "online_url", otherwise the submission [url] parameter will be
ignored.

"basic_lti_launch" requires the assignment submission_type "online" or "external_tool"
- submission[body] (form, optional): Submit the assignment as an HTML document snippet. Note this HTML snippet
will be sanitized using the same ruleset as a submission made from the
Canvas web UI. The sanitized HTML will be returned in the response as the
submission body. Requires a submission_type of "online_text_entry".
- submission[url] (form, optional): Submit the assignment as a URL. The URL scheme must be "http" or "https",
no "ftp" or other URL schemes are allowed. If no scheme is given (e.g.
"www.example.com") then "http" will be assumed. Requires a submission_type
of "online_url" or "basic_lti_launch".
- submission[file_ids] (form, optional): Submit the assignment as a set of one or more previously uploaded files
residing in the submitting user's files section (or the group's files
section, for group assignments).

To upload a new file to submit, see the submissions {api:SubmissionsApiController#create_file Upload a file API}.

Requires a submission_type of "online_upload".
- submission[media_comment_id] (form, optional): The media comment id to submit. Media comment ids can be submitted via
this API, however, note that there is not yet an API to generate or list
existing media comments, so this functionality is currently of limited use.

Requires a submission_type of "media_recording".
- submission[media_comment_type] (form, optional): The type of media comment being submitted.
- submission[user_id] (form, optional): Submit on behalf of the given user. Requires grading permission.
- submission[annotatable_attachment_id] (form, optional): The Attachment ID of the document being annotated. This should
match
the annotatable_attachment_id on the assignment.

Requires a submission_type of "student_annotation".
- submission[submitted_at] (form, optional): Choose the time the submission is listed as submitted at. Requires grading
permission.

- **POST** /v1/sections/{section_id}/assignments/{assignment_id}/submissions
    - Description: Submit an assignment
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - comment[text_comment] (form, optional): Include a textual comment with the submission.
        - submission[group_comment] (form, optional): Whether or not this comment should be sent to the entire group (
          defaults
          to false). Ignored if this is not a group assignment or if no text_comment
          is provided.
        - submission[submission_type] (form, required): The type of submission being made. The assignment
          submission_types must
          include this submission type as an allowed option, or the submission will be rejected with a 400 error.

The submission_type given determines which of the following parameters is
used. For instance, to submit a URL, submission [submission_type] must be
set to "online_url", otherwise the submission [url] parameter will be
ignored.

"basic_lti_launch" requires the assignment submission_type "online" or "external_tool"
- submission[body] (form, optional): Submit the assignment as an HTML document snippet. Note this HTML snippet
will be sanitized using the same ruleset as a submission made from the
Canvas web UI. The sanitized HTML will be returned in the response as the
submission body. Requires a submission_type of "online_text_entry".
- submission[url] (form, optional): Submit the assignment as a URL. The URL scheme must be "http" or "https",
no "ftp" or other URL schemes are allowed. If no scheme is given (e.g.
"www.example.com") then "http" will be assumed. Requires a submission_type
of "online_url" or "basic_lti_launch".
- submission[file_ids] (form, optional): Submit the assignment as a set of one or more previously uploaded files
residing in the submitting user's files section (or the group's files
section, for group assignments).

To upload a new file to submit, see the submissions {api:SubmissionsApiController#create_file Upload a file API}.

Requires a submission_type of "online_upload".
- submission[media_comment_id] (form, optional): The media comment id to submit. Media comment ids can be submitted via
this API, however, note that there is not yet an API to generate or list
existing media comments, so this functionality is currently of limited use.

Requires a submission_type of "media_recording".
- submission[media_comment_type] (form, optional): The type of media comment being submitted.
- submission[user_id] (form, optional): Submit on behalf of the given user. Requires grading permission.
- submission[annotatable_attachment_id] (form, optional): The Attachment ID of the document being annotated. This should
match
the annotatable_attachment_id on the assignment.

Requires a submission_type of "student_annotation".
- submission[submitted_at] (form, optional): Choose the time the submission is listed as submitted at. Requires grading
permission.

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/submissions
    - Description: List assignment submissions
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - include (query, optional): Associations to include with the group.  "group" will add group_id and group_name.
        - grouped (query, optional): If this argument is true, the response will be grouped by student groups.

- **GET** /v1/sections/{section_id}/assignments/{assignment_id}/submissions
    - Description: List assignment submissions
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - include (query, optional): Associations to include with the group.  "group" will add group_id and group_name.
        - grouped (query, optional): If this argument is true, the response will be grouped by student groups.

- **GET** /v1/courses/{course_id}/students/submissions
    - Description: List submissions for multiple assignments
    - Parameters:
        - course_id (path, required): ID
        - student_ids (query, optional): List of student ids to return submissions for. If this argument is
          omitted, return submissions for the calling user. Students may only list
          their own submissions. Observers may only list those of associated
          students. The special id "all" will return submissions for all students
          in the course/section as appropriate.
        - assignment_ids (query, optional): List of assignments to return submissions for. If none are given,
          submissions for all assignments are returned.
        - grouped (query, optional): If this argument is present, the response will be grouped by student,
          rather than a flat array of submissions.
        - post_to_sis (query, optional): If this argument is set to true, the response will only include
          submissions for assignments that have the post_to_sis flag set to true and
          user enrollments that were added through sis.
        - submitted_since (query, optional): If this argument is set, the response will only include submissions that
          were submitted after the specified date_time. This will exclude
          submissions that do not have a submitted_at which will exclude unsubmitted
          submissions.
          The value must be formatted as ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - graded_since (query, optional): If this argument is set, the response will only include submissions that
          were graded after the specified date_time. This will exclude
          submissions that have not been graded.
          The value must be formatted as ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - grading_period_id (query, optional): The id of the grading period in which submissions are being requested
          (Requires grading periods to exist on the account)
        - workflow_state (query, optional): The current status of the submission
        - enrollment_state (query, optional): The current state of the enrollments. If omitted will include all
          enrollments that are not deleted.
        - state_based_on_date (query, optional): If omitted it is set to true. When set to false it will ignore the
          effective
          state of the student enrollments and use the workflow_state for the
          enrollments. The argument is ignored unless enrollment_state argument is
          also passed.
        - order (query, optional): The order submissions will be returned in. Defaults to "id". Doesn't
          affect results for "grouped" mode.
        - order_direction (query, optional): Determines whether ordered results are returned in ascending or descending
          order. Defaults to "ascending". Doesn't affect results for "grouped" mode.
        - include (query, optional): Associations to include with the group. `total_scores` requires the
          `grouped` argument.

- **GET** /v1/sections/{section_id}/students/submissions
    - Description: List submissions for multiple assignments
    - Parameters:
        - section_id (path, required): ID
        - student_ids (query, optional): List of student ids to return submissions for. If this argument is
          omitted, return submissions for the calling user. Students may only list
          their own submissions. Observers may only list those of associated
          students. The special id "all" will return submissions for all students
          in the course/section as appropriate.
        - assignment_ids (query, optional): List of assignments to return submissions for. If none are given,
          submissions for all assignments are returned.
        - grouped (query, optional): If this argument is present, the response will be grouped by student,
          rather than a flat array of submissions.
        - post_to_sis (query, optional): If this argument is set to true, the response will only include
          submissions for assignments that have the post_to_sis flag set to true and
          user enrollments that were added through sis.
        - submitted_since (query, optional): If this argument is set, the response will only include submissions that
          were submitted after the specified date_time. This will exclude
          submissions that do not have a submitted_at which will exclude unsubmitted
          submissions.
          The value must be formatted as ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - graded_since (query, optional): If this argument is set, the response will only include submissions that
          were graded after the specified date_time. This will exclude
          submissions that have not been graded.
          The value must be formatted as ISO 8601 YYYY-MM-DDTHH:MM:SSZ.
        - grading_period_id (query, optional): The id of the grading period in which submissions are being requested
          (Requires grading periods to exist on the account)
        - workflow_state (query, optional): The current status of the submission
        - enrollment_state (query, optional): The current state of the enrollments. If omitted will include all
          enrollments that are not deleted.
        - state_based_on_date (query, optional): If omitted it is set to true. When set to false it will ignore the
          effective
          state of the student enrollments and use the workflow_state for the
          enrollments. The argument is ignored unless enrollment_state argument is
          also passed.
        - order (query, optional): The order submissions will be returned in. Defaults to "id". Doesn't
          affect results for "grouped" mode.
        - order_direction (query, optional): Determines whether ordered results are returned in ascending or descending
          order. Defaults to "ascending". Doesn't affect results for "grouped" mode.
        - include (query, optional): Associations to include with the group. `total_scores` requires the
          `grouped` argument.

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}
    - Description: Get a single submission
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID
        - include (query, optional): Associations to include with the group.

- **GET** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}
    - Description: Get a single submission
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID
        - include (query, optional): Associations to include with the group.

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/anonymous_submissions/{anonymous_id}
    - Description: Get a single submission by anonymous id
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - anonymous_id (path, required): ID
        - include (query, optional): Associations to include with the group.

- **GET** /v1/sections/{section_id}/assignments/{assignment_id}/anonymous_submissions/{anonymous_id}
    - Description: Get a single submission by anonymous id
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - anonymous_id (path, required): ID
        - include (query, optional): Associations to include with the group.

- **POST** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/files
    - Description: Upload a file
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **POST** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}/files
    - Description: Upload a file
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}
    - Description: Grade or comment on a submission
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID
        - comment[text_comment] (form, optional): Add a textual comment to the submission.
        - comment[attempt] (form, optional): The attempt number (starts at 1) to associate the comment with.
        - comment[group_comment] (form, optional): Whether or not this comment should be sent to the entire group (
          defaults
          to false). Ignored if this is not a group assignment or if no text_comment
          is provided.
        - comment[media_comment_id] (form, optional): Add an audio/video comment to the submission. Media comments can
          be added
          via this API, however, note that there is not yet an API to generate or
          list existing media comments, so this functionality is currently of
          limited use.
        - comment[media_comment_type] (form, optional): The type of media comment being added.
        - comment[file_ids] (form, optional): Attach files to this comment that were previously uploaded using the
          Submission Comment API's files action
        - include[visibility] (form, optional): Whether this assignment is visible to the owner of the submission
        - prefer_points_over_scheme (form, optional): Treat posted_grade as points if the value matches a grading scheme
          value
        - submission[posted_grade] (form, optional): Assign a score to the submission, updating both the "score" and "
          grade"
          fields on the submission record. This parameter can be passed in a few
          different formats:

points:: A floating point or integral value, such as "13.5". The grade
will be interpreted directly as the score of the assignment.
Values above assignment.points_possible are allowed, for awarding
extra credit.
percentage:: A floating point value appended with a percent sign, such as
"40%". The grade will be interpreted as a percentage score on the
assignment, where 100% == assignment.points_possible. Values above 100%
are allowed, for awarding extra credit.
letter grade:: A letter grade, following the assignment's defined letter
grading scheme. For example, "A-". The resulting score will be the high
end of the defined range for the letter grade. For instance, if "B" is
defined as 86% to 84%, a letter grade of "B" will be worth 86%. The
letter grade will be rejected if the assignment does not have a defined
letter grading scheme. For more fine-grained control of scores, pass in
points or percentage rather than the letter grade.
"pass/complete/fail/incomplete":: A string value of "pass" or "complete"
will give a score of 100%. "fail" or "incomplete" will give a score of

0.

Note that assignments with grading_type of "pass_fail" can only be
assigned a score of 0 or assignment.points_possible, nothing inbetween. If
a posted_grade in the "points" or "percentage" format is sent, the grade
will only be accepted if the grade equals one of those two values.
- submission[excuse] (form, optional): Sets the "excused" status of an assignment.
- submission[late_policy_status] (form, optional): Sets the late policy status to either "late", "missing", "
extended", "none", or null.
NB: "extended" values can only be set in the UI when the "UI features for 'extended' Submissions" Account Feature is on
- submission[sticker] (form, optional): Sets the sticker for the submission.
- submission[seconds_late_override] (form, optional): Sets the seconds late if late policy status is "late"
- rubric_assessment (form, optional): Assign a rubric assessment to this assignment submission. The
sub-parameters here depend on the rubric for the assignment. The general
format is, for each row in the rubric:

The points awarded for this row.
rubric_assessment[criterion_id][points]

The rating id for the row.
rubric_assessment[criterion_id][rating_id]

Comments to add for this row.
rubric_assessment[criterion_id][comments]

For example, if the assignment rubric is (in JSON format):
!!!javascript
[
{
'id': 'crit1',
'points': 10,
'description': 'Criterion 1',
'ratings':
[
{ 'id': 'rat1', 'description': 'Good', 'points': 10 },
{ 'id': 'rat2', 'description': 'Poor', 'points': 3 }
]
},
{
'id': 'crit2',
'points': 5,
'description': 'Criterion 2',
'ratings':
[
{ 'id': 'rat1', 'description': 'Exemplary', 'points': 5 },
{ 'id': 'rat2', 'description': 'Complete', 'points': 5 },
{ 'id': 'rat3', 'description': 'Incomplete', 'points': 0 }
]
}
]

Then a possible set of values for rubric_assessment would be:
rubric_assessment[crit1][points]=3&rubric_assessment[crit1][rating_id]=rat1&rubric_assessment[crit2][points]
=5&rubric_assessment[crit2][rating_id]=rat2&rubric_assessment[crit2][comments]=Well%20Done.

- **PUT** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}
    - Description: Grade or comment on a submission
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID
        - comment[text_comment] (form, optional): Add a textual comment to the submission.
        - comment[attempt] (form, optional): The attempt number (starts at 1) to associate the comment with.
        - comment[group_comment] (form, optional): Whether or not this comment should be sent to the entire group (
          defaults
          to false). Ignored if this is not a group assignment or if no text_comment
          is provided.
        - comment[media_comment_id] (form, optional): Add an audio/video comment to the submission. Media comments can
          be added
          via this API, however, note that there is not yet an API to generate or
          list existing media comments, so this functionality is currently of
          limited use.
        - comment[media_comment_type] (form, optional): The type of media comment being added.
        - comment[file_ids] (form, optional): Attach files to this comment that were previously uploaded using the
          Submission Comment API's files action
        - include[visibility] (form, optional): Whether this assignment is visible to the owner of the submission
        - prefer_points_over_scheme (form, optional): Treat posted_grade as points if the value matches a grading scheme
          value
        - submission[posted_grade] (form, optional): Assign a score to the submission, updating both the "score" and "
          grade"
          fields on the submission record. This parameter can be passed in a few
          different formats:

points:: A floating point or integral value, such as "13.5". The grade
will be interpreted directly as the score of the assignment.
Values above assignment.points_possible are allowed, for awarding
extra credit.
percentage:: A floating point value appended with a percent sign, such as
"40%". The grade will be interpreted as a percentage score on the
assignment, where 100% == assignment.points_possible. Values above 100%
are allowed, for awarding extra credit.
letter grade:: A letter grade, following the assignment's defined letter
grading scheme. For example, "A-". The resulting score will be the high
end of the defined range for the letter grade. For instance, if "B" is
defined as 86% to 84%, a letter grade of "B" will be worth 86%. The
letter grade will be rejected if the assignment does not have a defined
letter grading scheme. For more fine-grained control of scores, pass in
points or percentage rather than the letter grade.
"pass/complete/fail/incomplete":: A string value of "pass" or "complete"
will give a score of 100%. "fail" or "incomplete" will give a score of

0.

Note that assignments with grading_type of "pass_fail" can only be
assigned a score of 0 or assignment.points_possible, nothing inbetween. If
a posted_grade in the "points" or "percentage" format is sent, the grade
will only be accepted if the grade equals one of those two values.
- submission[excuse] (form, optional): Sets the "excused" status of an assignment.
- submission[late_policy_status] (form, optional): Sets the late policy status to either "late", "missing", "
extended", "none", or null.
NB: "extended" values can only be set in the UI when the "UI features for 'extended' Submissions" Account Feature is on
- submission[sticker] (form, optional): Sets the sticker for the submission.
- submission[seconds_late_override] (form, optional): Sets the seconds late if late policy status is "late"
- rubric_assessment (form, optional): Assign a rubric assessment to this assignment submission. The
sub-parameters here depend on the rubric for the assignment. The general
format is, for each row in the rubric:

The points awarded for this row.
rubric_assessment[criterion_id][points]

The rating id for the row.
rubric_assessment[criterion_id][rating_id]

Comments to add for this row.
rubric_assessment[criterion_id][comments]

For example, if the assignment rubric is (in JSON format):
!!!javascript
[
{
'id': 'crit1',
'points': 10,
'description': 'Criterion 1',
'ratings':
[
{ 'id': 'rat1', 'description': 'Good', 'points': 10 },
{ 'id': 'rat2', 'description': 'Poor', 'points': 3 }
]
},
{
'id': 'crit2',
'points': 5,
'description': 'Criterion 2',
'ratings':
[
{ 'id': 'rat1', 'description': 'Exemplary', 'points': 5 },
{ 'id': 'rat2', 'description': 'Complete', 'points': 5 },
{ 'id': 'rat3', 'description': 'Incomplete', 'points': 0 }
]
}
]

Then a possible set of values for rubric_assessment would be:
rubric_assessment[crit1][points]=3&rubric_assessment[crit1][rating_id]=rat1&rubric_assessment[crit2][points]
=5&rubric_assessment[crit2][rating_id]=rat2&rubric_assessment[crit2][comments]=Well%20Done.

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/anonymous_submissions/{anonymous_id}
    - Description: Grade or comment on a submission by anonymous id
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - anonymous_id (path, required): ID
        - comment[text_comment] (form, optional): Add a textual comment to the submission.
        - comment[group_comment] (form, optional): Whether or not this comment should be sent to the entire group (
          defaults
          to false). Ignored if this is not a group assignment or if no text_comment
          is provided.
        - comment[media_comment_id] (form, optional): Add an audio/video comment to the submission. Media comments can
          be added
          via this API, however, note that there is not yet an API to generate or
          list existing media comments, so this functionality is currently of
          limited use.
        - comment[media_comment_type] (form, optional): The type of media comment being added.
        - comment[file_ids] (form, optional): Attach files to this comment that were previously uploaded using the
          Submission Comment API's files action
        - include[visibility] (form, optional): Whether this assignment is visible to the owner of the submission
        - submission[posted_grade] (form, optional): Assign a score to the submission, updating both the "score" and "
          grade"
          fields on the submission record. This parameter can be passed in a few
          different formats:

points:: A floating point or integral value, such as "13.5". The grade
will be interpreted directly as the score of the assignment.
Values above assignment.points_possible are allowed, for awarding
extra credit.
percentage:: A floating point value appended with a percent sign, such as
"40%". The grade will be interpreted as a percentage score on the
assignment, where 100% == assignment.points_possible. Values above 100%
are allowed, for awarding extra credit.
letter grade:: A letter grade, following the assignment's defined letter
grading scheme. For example, "A-". The resulting score will be the high
end of the defined range for the letter grade. For instance, if "B" is
defined as 86% to 84%, a letter grade of "B" will be worth 86%. The
letter grade will be rejected if the assignment does not have a defined
letter grading scheme. For more fine-grained control of scores, pass in
points or percentage rather than the letter grade.
"pass/complete/fail/incomplete":: A string value of "pass" or "complete"
will give a score of 100%. "fail" or "incomplete" will give a score of

0.

Note that assignments with grading_type of "pass_fail" can only be
assigned a score of 0 or assignment.points_possible, nothing inbetween. If
a posted_grade in the "points" or "percentage" format is sent, the grade
will only be accepted if the grade equals one of those two values.
- submission[excuse] (form, optional): Sets the "excused" status of an assignment.
- submission[late_policy_status] (form, optional): Sets the late policy status to either "late", "missing", "
extended", "none", or null.
NB: "extended" values can only be set in the UI when the "UI features for 'extended' Submissions" Account Feature is on
- submission[seconds_late_override] (form, optional): Sets the seconds late if late policy status is "late"
- rubric_assessment (form, optional): Assign a rubric assessment to this assignment submission. The
sub-parameters here depend on the rubric for the assignment. The general
format is, for each row in the rubric:

The points awarded for this row.
rubric_assessment[criterion_id][points]

The rating id for the row.
rubric_assessment[criterion_id][rating_id]

Comments to add for this row.
rubric_assessment[criterion_id][comments]

For example, if the assignment rubric is (in JSON format):
!!!javascript
[
{
'id': 'crit1',
'points': 10,
'description': 'Criterion 1',
'ratings':
[
{ 'id': 'rat1', 'description': 'Good', 'points': 10 },
{ 'id': 'rat2', 'description': 'Poor', 'points': 3 }
]
},
{
'id': 'crit2',
'points': 5,
'description': 'Criterion 2',
'ratings':
[
{ 'id': 'rat1', 'description': 'Exemplary', 'points': 5 },
{ 'id': 'rat2', 'description': 'Complete', 'points': 5 },
{ 'id': 'rat3', 'description': 'Incomplete', 'points': 0 }
]
}
]

Then a possible set of values for rubric_assessment would be:
rubric_assessment[crit1][points]=3&rubric_assessment[crit1][rating_id]=rat1&rubric_assessment[crit2][points]
=5&rubric_assessment[crit2][rating_id]=rat2&rubric_assessment[crit2][comments]=Well%20Done.

- **PUT** /v1/sections/{section_id}/assignments/{assignment_id}/anonymous_submissions/{anonymous_id}
    - Description: Grade or comment on a submission by anonymous id
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - anonymous_id (path, required): ID
        - comment[text_comment] (form, optional): Add a textual comment to the submission.
        - comment[group_comment] (form, optional): Whether or not this comment should be sent to the entire group (
          defaults
          to false). Ignored if this is not a group assignment or if no text_comment
          is provided.
        - comment[media_comment_id] (form, optional): Add an audio/video comment to the submission. Media comments can
          be added
          via this API, however, note that there is not yet an API to generate or
          list existing media comments, so this functionality is currently of
          limited use.
        - comment[media_comment_type] (form, optional): The type of media comment being added.
        - comment[file_ids] (form, optional): Attach files to this comment that were previously uploaded using the
          Submission Comment API's files action
        - include[visibility] (form, optional): Whether this assignment is visible to the owner of the submission
        - submission[posted_grade] (form, optional): Assign a score to the submission, updating both the "score" and "
          grade"
          fields on the submission record. This parameter can be passed in a few
          different formats:

points:: A floating point or integral value, such as "13.5". The grade
will be interpreted directly as the score of the assignment.
Values above assignment.points_possible are allowed, for awarding
extra credit.
percentage:: A floating point value appended with a percent sign, such as
"40%". The grade will be interpreted as a percentage score on the
assignment, where 100% == assignment.points_possible. Values above 100%
are allowed, for awarding extra credit.
letter grade:: A letter grade, following the assignment's defined letter
grading scheme. For example, "A-". The resulting score will be the high
end of the defined range for the letter grade. For instance, if "B" is
defined as 86% to 84%, a letter grade of "B" will be worth 86%. The
letter grade will be rejected if the assignment does not have a defined
letter grading scheme. For more fine-grained control of scores, pass in
points or percentage rather than the letter grade.
"pass/complete/fail/incomplete":: A string value of "pass" or "complete"
will give a score of 100%. "fail" or "incomplete" will give a score of

0.

Note that assignments with grading_type of "pass_fail" can only be
assigned a score of 0 or assignment.points_possible, nothing inbetween. If
a posted_grade in the "points" or "percentage" format is sent, the grade
will only be accepted if the grade equals one of those two values.
- submission[excuse] (form, optional): Sets the "excused" status of an assignment.
- submission[late_policy_status] (form, optional): Sets the late policy status to either "late", "missing", "
extended", "none", or null.
NB: "extended" values can only be set in the UI when the "UI features for 'extended' Submissions" Account Feature is on
- submission[seconds_late_override] (form, optional): Sets the seconds late if late policy status is "late"
- rubric_assessment (form, optional): Assign a rubric assessment to this assignment submission. The
sub-parameters here depend on the rubric for the assignment. The general
format is, for each row in the rubric:

The points awarded for this row.
rubric_assessment[criterion_id][points]

The rating id for the row.
rubric_assessment[criterion_id][rating_id]

Comments to add for this row.
rubric_assessment[criterion_id][comments]

For example, if the assignment rubric is (in JSON format):
!!!javascript
[
{
'id': 'crit1',
'points': 10,
'description': 'Criterion 1',
'ratings':
[
{ 'id': 'rat1', 'description': 'Good', 'points': 10 },
{ 'id': 'rat2', 'description': 'Poor', 'points': 3 }
]
},
{
'id': 'crit2',
'points': 5,
'description': 'Criterion 2',
'ratings':
[
{ 'id': 'rat1', 'description': 'Exemplary', 'points': 5 },
{ 'id': 'rat2', 'description': 'Complete', 'points': 5 },
{ 'id': 'rat3', 'description': 'Incomplete', 'points': 0 }
]
}
]

Then a possible set of values for rubric_assessment would be:
rubric_assessment[crit1][points]=3&rubric_assessment[crit1][rating_id]=rat1&rubric_assessment[crit2][points]
=5&rubric_assessment[crit2][rating_id]=rat2&rubric_assessment[crit2][comments]=Well%20Done.

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/gradeable_students
    - Description: List gradeable students
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/gradeable_students
    - Description: List multiple assignments gradeable students
    - Parameters:
        - course_id (path, required): ID
        - assignment_ids (query, optional): Assignments being requested

- **POST** /v1/courses/{course_id}/submissions/update_grades
    - Description: Grade or comment on multiple submissions
    - Parameters:
        - course_id (path, required): ID
        - grade_data[<student_id>][posted_grade] (form, optional): See documentation for the posted_grade argument in
          the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][excuse] (form, optional): See documentation for the excuse argument in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][rubric_assessment] (form, optional): See documentation for the rubric_assessment
          argument in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][text_comment] (form, optional): no description
        - grade_data[<student_id>][group_comment] (form, optional): no description
        - grade_data[<student_id>][media_comment_id] (form, optional): no description
        - grade_data[<student_id>][media_comment_type] (form, optional): no description
        - grade_data[<student_id>][file_ids] (form, optional): See documentation for the comment[] arguments in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<assignment_id>][<student_id>] (form, optional): Specifies which assignment to grade. This argument
          is not necessary when
          using the assignment-specific endpoints.

- **POST** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/update_grades
    - Description: Grade or comment on multiple submissions
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - grade_data[<student_id>][posted_grade] (form, optional): See documentation for the posted_grade argument in
          the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][excuse] (form, optional): See documentation for the excuse argument in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][rubric_assessment] (form, optional): See documentation for the rubric_assessment
          argument in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][text_comment] (form, optional): no description
        - grade_data[<student_id>][group_comment] (form, optional): no description
        - grade_data[<student_id>][media_comment_id] (form, optional): no description
        - grade_data[<student_id>][media_comment_type] (form, optional): no description
        - grade_data[<student_id>][file_ids] (form, optional): See documentation for the comment[] arguments in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<assignment_id>][<student_id>] (form, optional): Specifies which assignment to grade. This argument
          is not necessary when
          using the assignment-specific endpoints.

- **POST** /v1/sections/{section_id}/submissions/update_grades
    - Description: Grade or comment on multiple submissions
    - Parameters:
        - section_id (path, required): ID
        - grade_data[<student_id>][posted_grade] (form, optional): See documentation for the posted_grade argument in
          the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][excuse] (form, optional): See documentation for the excuse argument in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][rubric_assessment] (form, optional): See documentation for the rubric_assessment
          argument in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][text_comment] (form, optional): no description
        - grade_data[<student_id>][group_comment] (form, optional): no description
        - grade_data[<student_id>][media_comment_id] (form, optional): no description
        - grade_data[<student_id>][media_comment_type] (form, optional): no description
        - grade_data[<student_id>][file_ids] (form, optional): See documentation for the comment[] arguments in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<assignment_id>][<student_id>] (form, optional): Specifies which assignment to grade. This argument
          is not necessary when
          using the assignment-specific endpoints.

- **POST** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/update_grades
    - Description: Grade or comment on multiple submissions
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - grade_data[<student_id>][posted_grade] (form, optional): See documentation for the posted_grade argument in
          the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][excuse] (form, optional): See documentation for the excuse argument in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][rubric_assessment] (form, optional): See documentation for the rubric_assessment
          argument in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<student_id>][text_comment] (form, optional): no description
        - grade_data[<student_id>][group_comment] (form, optional): no description
        - grade_data[<student_id>][media_comment_id] (form, optional): no description
        - grade_data[<student_id>][media_comment_type] (form, optional): no description
        - grade_data[<student_id>][file_ids] (form, optional): See documentation for the comment[] arguments in the
          {api:SubmissionsApiController#update Submissions Update} documentation
        - grade_data[<assignment_id>][<student_id>] (form, optional): Specifies which assignment to grade. This argument
          is not necessary when
          using the assignment-specific endpoints.

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/read
    - Description: Mark submission as read
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}/read
    - Description: Mark submission as read
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **DELETE** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/read
    - Description: Mark submission as unread
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **DELETE** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}/read
    - Description: Mark submission as unread
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/courses/{course_id}/submissions/bulk_mark_read
    - Description: Mark bulk submissions as read
    - Parameters:
        - course_id (path, required): ID
        - submissionIds (form, optional): no description

- **PUT** /v1/sections/{section_id}/submissions/bulk_mark_read
    - Description: Mark bulk submissions as read
    - Parameters:
        - section_id (path, required): ID
        - submissionIds (form, optional): no description

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/read/{item}
    - Description: Mark submission item as read
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID
        - item (path, required): ID

- **PUT** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}/read/{item}
    - Description: Mark submission item as read
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID
        - item (path, required): ID

- **PUT** /v1/courses/{course_id}/submissions/{user_id}/clear_unread
    - Description: Clear unread status for all submissions.
    - Parameters:
        - course_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/sections/{section_id}/submissions/{user_id}/clear_unread
    - Description: Clear unread status for all submissions.
    - Parameters:
        - section_id (path, required): ID
        - user_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/rubric_comments/read
    - Description: Get rubric assessments read state
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/rubric_assessments/read
    - Description: Get rubric assessments read state
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **GET** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}/rubric_comments/read
    - Description: Get rubric assessments read state
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **GET** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}/rubric_assessments/read
    - Description: Get rubric assessments read state
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/rubric_comments/read
    - Description: Mark rubric assessments as read
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/rubric_assessments/read
    - Description: Mark rubric assessments as read
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}/rubric_comments/read
    - Description: Mark rubric assessments as read
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}/rubric_assessments/read
    - Description: Mark rubric assessments as read
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/document_annotations/read
    - Description: Get document annotations read state
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **GET** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}/document_annotations/read
    - Description: Get document annotations read state
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/courses/{course_id}/assignments/{assignment_id}/submissions/{user_id}/document_annotations/read
    - Description: Mark document annotations as read
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **PUT** /v1/sections/{section_id}/assignments/{assignment_id}/submissions/{user_id}/document_annotations/read
    - Description: Mark document annotations as read
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - user_id (path, required): ID

- **GET** /v1/courses/{course_id}/assignments/{assignment_id}/submission_summary
    - Description: Submission Summary
    - Parameters:
        - course_id (path, required): ID
        - assignment_id (path, required): ID
        - grouped (query, optional): If this argument is true, the response will take into account student groups.

- **GET** /v1/sections/{section_id}/assignments/{assignment_id}/submission_summary
    - Description: Submission Summary
    - Parameters:
        - section_id (path, required): ID
        - assignment_id (path, required): ID
        - grouped (query, optional): If this argument is true, the response will take into account student groups.

### Tabs

Path: `/tabs.json`

- **GET** /v1/accounts/{account_id}/tabs
    - Description: List available tabs for a course or group
    - Parameters:
        - account_id (path, required): ID
        - include (query, optional): - "course_subject_tabs": Optional flag to return the tabs associated with a
          canvas_for_elementary subject course's
          home page instead of the typical sidebar navigation. Only takes effect if this request is for a course context
          in a canvas_for_elementary-enabled account or sub-account.

- **GET** /v1/courses/{course_id}/tabs
    - Description: List available tabs for a course or group
    - Parameters:
        - course_id (path, required): ID
        - include (query, optional): - "course_subject_tabs": Optional flag to return the tabs associated with a
          canvas_for_elementary subject course's
          home page instead of the typical sidebar navigation. Only takes effect if this request is for a course context
          in a canvas_for_elementary-enabled account or sub-account.

- **GET** /v1/groups/{group_id}/tabs
    - Description: List available tabs for a course or group
    - Parameters:
        - group_id (path, required): ID
        - include (query, optional): - "course_subject_tabs": Optional flag to return the tabs associated with a
          canvas_for_elementary subject course's
          home page instead of the typical sidebar navigation. Only takes effect if this request is for a course context
          in a canvas_for_elementary-enabled account or sub-account.

- **GET** /v1/users/{user_id}/tabs
    - Description: List available tabs for a course or group
    - Parameters:
        - user_id (path, required): ID
        - include (query, optional): - "course_subject_tabs": Optional flag to return the tabs associated with a
          canvas_for_elementary subject course's
          home page instead of the typical sidebar navigation. Only takes effect if this request is for a course context
          in a canvas_for_elementary-enabled account or sub-account.

- **PUT** /v1/courses/{course_id}/tabs/{tab_id}
    - Description: Update a tab for a course
    - Parameters:
        - course_id (path, required): ID
        - tab_id (path, required): ID
        - position (form, optional): The new position of the tab, 1-based
        - hidden (form, optional): no description

### Temporary Enrollment Pairings

Path: `/temporary_enrollment_pairings.json`

- **GET** /v1/accounts/{account_id}/temporary_enrollment_pairings
    - Description: List temporary enrollment pairings
    - Parameters:
        - account_id (path, required): ID

- **GET** /v1/accounts/{account_id}/temporary_enrollment_pairings/{id}
    - Description: Get a single temporary enrollment pairing
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

- **GET** /v1/accounts/{account_id}/temporary_enrollment_pairings/new
    - Description: New TemporaryEnrollmentPairing
    - Parameters:
        - account_id (path, required): ID

- **POST** /v1/accounts/{account_id}/temporary_enrollment_pairings
    - Description: Create Temporary Enrollment Pairing
    - Parameters:
        - account_id (path, required): ID
        - workflow_state (form, optional): The workflow state of the temporary enrollment pairing.
        - ending_enrollment_state (form, optional): The ending enrollment state to be given to each associated
          enrollment
          when the enrollment period has been reached. Defaults to "deleted" if no value is given.
          Accepted values are "deleted", "completed", and "inactive".

- **DELETE** /v1/accounts/{account_id}/temporary_enrollment_pairings/{id}
    - Description: Delete Temporary Enrollment Pairing
    - Parameters:
        - account_id (path, required): ID
        - id (path, required): ID

### User Observees

Path: `/user_observees.json`

- **GET** /v1/users/{user_id}/observees
    - Description: List observees
    - Parameters:
        - user_id (path, required): ID
        - include (query, optional): - "avatar_url": Optionally include avatar_url.

- **GET** /v1/users/{user_id}/observers
    - Description: List observers
    - Parameters:
        - user_id (path, required): ID
        - include (query, optional): - "avatar_url": Optionally include avatar_url.

- **POST** /v1/users/{user_id}/observees
    - Description: Add an observee with credentials
    - Parameters:
        - user_id (path, required): ID
        - observee[unique_id] (form, optional): The login id for the user to observe. Required if access_token is
          omitted.
        - observee[password] (form, optional): The password for the user to observe. Required if access_token is
          omitted.
        - access_token (form, optional): The access token for the user to observe. Required if <tt>
          observee[unique_id]</tt> or <tt>observee[password]</tt> are omitted.
        - pairing_code (form, optional): A generated pairing code for the user to observe. Required if the Observer
          pairing code feature flag is enabled
        - root_account_id (form, optional): The ID for the root account to associate with the observation link.
          Defaults to the current domain account.
          If 'all' is specified, a link will be created for each root account associated
          to both the observer and observee.

- **GET** /v1/users/{user_id}/observees/{observee_id}
    - Description: Show an observee
    - Parameters:
        - user_id (path, required): ID
        - observee_id (path, required): ID

- **GET** /v1/users/{user_id}/observers/{observer_id}
    - Description: Show an observer
    - Parameters:
        - user_id (path, required): ID
        - observer_id (path, required): ID

- **PUT** /v1/users/{user_id}/observees/{observee_id}
    - Description: Add an observee
    - Parameters:
        - user_id (path, required): ID
        - observee_id (path, required): ID
        - root_account_id (form, optional): The ID for the root account to associate with the observation link.
          If not specified, a link will be created for each root account associated
          to both the observer and observee.

- **DELETE** /v1/users/{user_id}/observees/{observee_id}
    - Description: Remove an observee
    - Parameters:
        - user_id (path, required): ID
        - observee_id (path, required): ID
        - root_account_id (query, optional): If specified, only removes the link for the given root account

- **POST** /v1/users/{user_id}/observer_pairing_codes
    - Description: Create observer pairing code
    - Parameters:
        - user_id (path, required): ID

### Users

Path: `/users.json`

- **GET** /v1/accounts/{account_id}/users
    - Description: List users in account
    - Parameters:
        - account_id (path, required): ID
        - search_term (query, optional): The partial name or full ID of the users to match and return in the
          results list. Must be at least 3 characters.

Note that the API will prefer matching on canonical user ID if the ID has
a numeric form. It will only search against other fields if non-numeric
in form, or if the numeric value doesn't yield any matches. Queries by
administrative users will search on SIS ID, Integration ID, login ID,
name, or email address
- enrollment_type (query, optional): When set, only return users enrolled with the specified course-level base role.
This can be a base role type of 'student', 'teacher',
'ta', 'observer', or 'designer'.
- sort (query, optional): The column to sort results by.
- order (query, optional): The order to sort the given column by.
- include_deleted_users (query, optional): When set to true and used with an account context, returns users who have
deleted
pseudonyms for the context

- **GET** /v1/users/self/activity_stream
    - Description: List the activity stream
    - Parameters:
        - only_active_courses (query, optional): If true, will only return objects for courses the user is actively
          participating in

- **GET** /v1/users/activity_stream
    - Description: List the activity stream
    - Parameters:
        - only_active_courses (query, optional): If true, will only return objects for courses the user is actively
          participating in

- **GET** /v1/users/self/activity_stream/summary
    - Description: Activity stream summary
    - Parameters:
        - only_active_courses (query, optional): If true, will only return objects for courses the user is actively
          participating in

- **GET** /v1/users/self/todo
    - Description: List the TODO items
    - Parameters:
        - include (query, optional): "ungraded_quizzes":: Optionally include ungraded quizzes (such as practice quizzes
          and surveys) in the list.
          These will be returned under a +quiz+ key instead of an +assignment+ key in response elements.

- **GET** /v1/users/self/todo_item_count
    - Description: List counts for todo items
    - Parameters:
        - include (query, optional): "ungraded_quizzes":: Optionally include ungraded quizzes (such as practice quizzes
          and surveys) in the list.
          These will be returned under a +quiz+ key instead of an +assignment+ key in response elements.

- **GET** /v1/users/self/upcoming_events
    - Description: List upcoming assignments, calendar events

- **GET** /v1/users/{user_id}/missing_submissions
    - Description: List Missing Submissions
    - Parameters:
        - user_id (path, required): the student's ID
        - observed_user_id (query, optional): Return missing submissions for the given observed user. Must be
          accompanied by course_ids[].
          The user making the request must be observing the observed user in all the courses specified by
          course_ids[].
        - include (query, optional): "planner_overrides":: Optionally include the assignment's associated planner
          override, if it exists, for the current user.
          These will be returned under a +planner_override+ key
          "course":: Optionally include the assignments' courses
        - filter (query, optional): "submittable":: Only return assignments that the current user can submit (i.e.
          filter out locked assignments)
          "current_grading_period":: Only return missing assignments that are in the current grading period
        - course_ids (query, optional): Optionally restricts the list of past-due assignments to only those associated
          with the specified
          course IDs. Required if observed_user_id is passed.

- **DELETE** /v1/users/self/activity_stream/{id}
    - Description: Hide a stream item
    - Parameters:
        - id (path, required): ID

- **DELETE** /v1/users/self/activity_stream
    - Description: Hide all stream items

- **POST** /v1/users/{user_id}/files
    - Description: Upload a file
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/users/{id}
    - Description: Show user details
    - Parameters:
        - id (path, required): ID
        - include (query, optional): Array of additional information to include on the user record.
          "locale", "avatar_url", "permissions", "email", and "effective_locale"
          will always be returned

- **POST** /v1/accounts/{account_id}/users
    - Description: Create a user
    - Parameters:
        - account_id (path, required): ID
        - user[name] (form, optional): The full name of the user. This name will be used by teacher for grading.
          Required if this is a self-registration.
        - user[short_name] (form, optional): User's name as it will be displayed in discussions, messages, and comments.
        - user[sortable_name] (form, optional): User's name as used to sort alphabetically in lists.
        - user[time_zone] (form, optional): The time zone for the user. Allowed time zones are
          {http://www.iana.org/time-zones IANA time zones} or friendlier
          {http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html Ruby on Rails time zones}.
        - user[locale] (form, optional): The user's preferred language, from the list of languages Canvas supports.
          This is in RFC-5646 format.
        - user[terms_of_use] (form, optional): Whether the user accepts the terms of use. Required if this is a
          self-registration and this canvas instance requires users to accept
          the terms (on by default).

If this is true, it will mark the user as having accepted the terms of use.
- user[skip_registration] (form, optional): Automatically mark the user as registered.

If this is true, it is recommended to set <tt>"pseudonym[send_confirmation]"</tt> to true as well.
Otherwise, the user will not receive any messages about their account creation.

The users communication channel confirmation can be skipped by setting
<tt>"communication_channel[skip_confirmation]"</tt> to true as well.
- pseudonym[unique_id] (form, required): User's login ID. If this is a self-registration, it must be a valid
email address.
- pseudonym[password] (form, optional): User's password. Cannot be set during self-registration.
- pseudonym[sis_user_id] (form, optional): SIS ID for the user's account. To set this parameter, the caller must be
able to manage SIS permissions.
- pseudonym[integration_id] (form, optional): Integration ID for the login. To set this parameter, the caller must be
able to
manage SIS permissions. The Integration ID is a secondary
identifier useful for more complex SIS integrations.
- pseudonym[send_confirmation] (form, optional): Send user notification of account creation if true.
Automatically set to true during self-registration.
- pseudonym[force_self_registration] (form, optional): Send user a self-registration style email if true.
Setting it means the users will get a notification asking them
to "complete the registration process" by clicking it, setting
a password, and letting them in. Will only be executed on
if the user does not need admin approval.
Defaults to false unless explicitly provided.
- pseudonym[authentication_provider_id] (form, optional): The authentication provider this login is associated with.
Logins
associated with a specific provider can only be used with that provider.
Legacy providers (LDAP, CAS, SAML) will search for logins associated with
them, or unassociated logins. New providers will only search for logins
explicitly associated with them. This can be the integer ID of the
provider, or the type of the provider (in which case, it will find the
first matching provider).
- communication_channel[type] (form, optional): The communication channel type, e.g. 'email' or 'sms'.
- communication_channel[address] (form, optional): The communication channel address, e.g. the user's email address.
- communication_channel[confirmation_url] (form, optional): Only valid for account admins. If true, returns the new user
account
confirmation URL in the response.
- communication_channel[skip_confirmation] (form, optional): Only valid for site admins and account admins making
requests; If true, the channel is
automatically validated and no confirmation email or SMS is sent.
Otherwise, the user must respond to a confirmation message to confirm the
channel.

If this is true, it is recommended to set <tt>"pseudonym[send_confirmation]"</tt> to true as well.
Otherwise, the user will not receive any messages about their account creation.
- force_validations (form, optional): If true, validations are performed on the newly created user (and their associated
pseudonym)
even if the request is made by a privileged user like an admin. When set to false,
or not included in the request parameters, any newly created users are subject to
validations unless the request is made by a user with a 'manage_user_logins' right.
In which case, certain validations such as 'require_acceptance_of_terms' and
'require_presence_of_name' are not enforced. Use this parameter to return helpful json
errors while building users with an admin request.
- enable_sis_reactivation (form, optional): When true, will first try to re-activate a deleted user with matching
sis_user_id if possible.
This is commonly done with user[skip_registration] and communication_channel[skip_confirmation]
so that the default communication_channel is also restored.
- destination (form, optional): If you're setting the password for the newly created user, you can provide this param
with a valid URL pointing into this Canvas installation, and the response will include
a destination field that's a URL that you can redirect a browser to and have the newly
created user automatically logged in. The URL is only valid for a short time, and must
match the domain this request is directed to, and be for a well-formed path that Canvas
can recognize.
- initial_enrollment_type (form, optional): `observer` if doing a self-registration with a pairing code. This allows
setting the
password during user creation.
- pairing_code[code] (form, optional): If provided and valid, will link the new user as an observer to the student's
whose
pairing code is given.

- **POST** /v1/accounts/{account_id}/self_registration
    - Description: [DEPRECATED] Self register a user
    - Parameters:
        - account_id (path, required): ID
        - user[name] (form, required): The full name of the user. This name will be used by teacher for grading.
        - user[short_name] (form, optional): User's name as it will be displayed in discussions, messages, and comments.
        - user[sortable_name] (form, optional): User's name as used to sort alphabetically in lists.
        - user[time_zone] (form, optional): The time zone for the user. Allowed time zones are
          {http://www.iana.org/time-zones IANA time zones} or friendlier
          {http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html Ruby on Rails time zones}.
        - user[locale] (form, optional): The user's preferred language, from the list of languages Canvas supports.
          This is in RFC-5646 format.
        - user[terms_of_use] (form, required): Whether the user accepts the terms of use.
        - pseudonym[unique_id] (form, required): User's login ID. Must be a valid email address.
        - communication_channel[type] (form, optional): The communication channel type, e.g. 'email' or 'sms'.
        - communication_channel[address] (form, optional): The communication channel address, e.g. the user's email
          address.

- **GET** /v1/users/{id}/settings
    - Description: Update user settings.
    - Parameters:
        - id (path, required): ID
        - manual_mark_as_read (query, optional): If true, require user to manually mark discussion posts as read (don't
          auto-mark as read).
        - release_notes_badge_disabled (query, optional): If true, hide the badge for new release notes.
        - collapse_global_nav (query, optional): If true, the user's page loads with the global navigation collapsed
        - collapse_course_nav (query, optional): If true, the user's course pages will load with the course navigation
          collapsed.
        - hide_dashcard_color_overlays (query, optional): If true, images on course cards will be presented without
          being tinted
          to match the course color.
        - comment_library_suggestions_enabled (query, optional): If true, suggestions within the comment library will be
          shown.
        - elementary_dashboard_disabled (query, optional): If true, will display the user's preferred class Canvas
          dashboard
          view instead of the canvas for elementary view.

- **GET** /v1/users/{id}/colors
    - Description: Get custom colors
    - Parameters:
        - id (path, required): ID

- **GET** /v1/users/{id}/colors/{asset_string}
    - Description: Get custom color
    - Parameters:
        - id (path, required): ID
        - asset_string (path, required): ID

- **PUT** /v1/users/{id}/colors/{asset_string}
    - Description: Update custom color
    - Parameters:
        - id (path, required): ID
        - asset_string (path, required): ID
        - hexcode (form, optional): The hexcode of the color to set for the context, if you choose to pass the
          hexcode as a query parameter rather than in the request body you should
          NOT include the '#' unless you escape it first.

- **PUT** /v1/users/{id}/text_editor_preference
    - Description: Update text editor preference
    - Parameters:
        - id (path, required): ID
        - text_editor_preference (form, optional): The identifier for the editor.

- **GET** /v1/users/{id}/dashboard_positions
    - Description: Get dashboard positions
    - Parameters:
        - id (path, required): ID

- **PUT** /v1/users/{id}/dashboard_positions
    - Description: Update dashboard positions
    - Parameters:
        - id (path, required): ID

- **PUT** /v1/users/{id}
    - Description: Edit a user
    - Parameters:
        - id (path, required): ID
        - user[name] (form, optional): The full name of the user. This name will be used by teacher for grading.
        - user[short_name] (form, optional): User's name as it will be displayed in discussions, messages, and comments.
        - user[sortable_name] (form, optional): User's name as used to sort alphabetically in lists.
        - user[time_zone] (form, optional): The time zone for the user. Allowed time zones are
          {http://www.iana.org/time-zones IANA time zones} or friendlier
          {http://api.rubyonrails.org/classes/ActiveSupport/TimeZone.html Ruby on Rails time zones}.
        - user[email] (form, optional): The default email address of the user.
        - user[locale] (form, optional): The user's preferred language, from the list of languages Canvas supports.
          This is in RFC-5646 format.
        - user[avatar][token] (form, optional): A unique representation of the avatar record to assign as the user's
          current avatar. This token can be obtained from the user avatars endpoint.
          This supersedes the user [avatar] [url] argument, and if both are included
          the url will be ignored. Note: this is an internal representation and is
          subject to change without notice. It should be consumed with this api
          endpoint and used in the user update endpoint, and should not be
          constructed by the client.
        - user[avatar][url] (form, optional): To set the user's avatar to point to an external url, do not include a
          token and instead pass the url here. Warning: For maximum compatibility,
          please use 128 px square images.
        - user[avatar][state] (form, optional): To set the state of user's avatar. Only valid for account administrator.
        - user[title] (form, optional): Sets a title on the user profile. (See {api:ProfileController#settings Get user
          profile}.)
          Profiles must be enabled on the root account.
        - user[bio] (form, optional): Sets a bio on the user profile. (See {api:ProfileController#settings Get user
          profile}.)
          Profiles must be enabled on the root account.
        - user[pronunciation] (form, optional): Sets name pronunciation on the user profile. (See {api:
          ProfileController#settings Get user profile}.)
          Profiles and name pronunciation must be enabled on the root account.
        - user[pronouns] (form, optional): Sets pronouns on the user profile.
          Passing an empty string will empty the user's pronouns
          Only Available Pronouns set on the root account are allowed
          Adding and changing pronouns must be enabled on the root account.
        - user[event] (form, optional): Suspends or unsuspends all logins for this user that the calling user
          has permission to
        - override_sis_stickiness (form, optional): Default is true. If false, any fields containing “sticky” changes
          will not be updated.
          See SIS CSV Format documentation for information on which fields can have SIS stickiness

- **DELETE** /v1/users/{id}/sessions
    - Description: Terminate all user sessions
    - Parameters:
        - id (path, required): ID

- **DELETE** /v1/users/mobile_sessions
    - Description: Log users out of all mobile apps

- **DELETE** /v1/users/{id}/mobile_sessions
    - Description: Log users out of all mobile apps
    - Parameters:
        - id (path, required): ID

- **PUT** /v1/users/{id}/merge_into/{destination_user_id}
    - Description: Merge user into another user
    - Parameters:
        - id (path, required): ID
        - destination_user_id (path, required): ID

- **PUT** /v1/users/{id}/merge_into/accounts/{destination_account_id}/users/{destination_user_id}
    - Description: Merge user into another user
    - Parameters:
        - id (path, required): ID
        - destination_account_id (path, required): ID
        - destination_user_id (path, required): ID

- **POST** /v1/users/{id}/split
    - Description: Split merged users into separate users
    - Parameters:
        - id (path, required): ID

- **POST** /v1/users/self/pandata_events_token
    - Description: Get a Pandata Events jwt token and its expiration date
    - Parameters:
        - app_key (form, optional): The pandata events appKey for this mobile app

- **GET** /v1/users/{id}/graded_submissions
    - Description: Get a users most recently graded submissions
    - Parameters:
        - id (path, required): ID
        - include (query, optional): Associations to include with the group
        - only_current_enrollments (query, optional): Returns submissions for only currently active enrollments
        - only_published_assignments (query, optional): Returns submissions for only published assignments

- **GET** /v1/users/{user_id}/profile
    - Description: Get user profile
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/users/{user_id}/avatars
    - Description: List avatar options
    - Parameters:
        - user_id (path, required): ID

- **GET** /v1/users/{user_id}/page_views
    - Description: List user page views
    - Parameters:
        - user_id (path, required): ID
        - start_time (query, optional): The beginning of the time range from which you want page views.
        - end_time (query, optional): The end of the time range from which you want page views.

- **PUT** /v1/users/{user_id}/custom_data
    - Description: Store custom data
    - Parameters:
        - user_id (path, required): ID
        - ns (form, required): The namespace under which to store the data. This should be something other
          Canvas API apps aren't likely to use, such as a reverse DNS for your organization.
        - data (form, required): The data you want to store for the user, at the specified scope. If the data is
          composed of (possibly nested) JSON objects, scopes will be generated for the (nested)
          keys (see examples).

- **GET** /v1/users/{user_id}/custom_data
    - Description: Load custom data
    - Parameters:
        - user_id (path, required): ID
        - ns (query, required): The namespace from which to retrieve the data. This should be something other
          Canvas API apps aren't likely to use, such as a reverse DNS for your organization.

- **DELETE** /v1/users/{user_id}/custom_data
    - Description: Delete custom data
    - Parameters:
        - user_id (path, required): ID
        - ns (query, required): The namespace from which to delete the data. This should be something other
          Canvas API apps aren't likely to use, such as a reverse DNS for your organization.

- **GET** /v1/users/self/course_nicknames
    - Description: List course nicknames

- **GET** /v1/users/self/course_nicknames/{course_id}
    - Description: Get course nickname
    - Parameters:
        - course_id (path, required): ID

- **PUT** /v1/users/self/course_nicknames/{course_id}
    - Description: Set course nickname
    - Parameters:
        - course_id (path, required): ID
        - nickname (form, required): The nickname to set. It must be non-empty and shorter than 60 characters.

- **DELETE** /v1/users/self/course_nicknames/{course_id}
    - Description: Remove course nickname
    - Parameters:
        - course_id (path, required): ID

- **DELETE** /v1/users/self/course_nicknames
    - Description: Clear course nicknames

### Webhooks Subscriptions for Plagiarism Platform

Path: `/webhooks_subscriptions_for_plagiarism_platform.json`

- **POST** /lti/subscriptions
    - Description: Create a Webhook Subscription
    - Parameters:
        - subscription[ContextId] (form, required): The id of the context for the subscription.
        - subscription[ContextType] (form, required): The type of context for the subscription. Must be 'assignment',
          'account', or 'course'.
        - subscription[EventTypes] (form, required): Array of strings representing the event types for
          the subscription.
        - subscription[Format] (form, required): Format to deliver the live events. Must be 'live-event' or 'caliper'.
        - subscription[TransportMetadata] (form, required): An object with a single key: 'Url'. Example: { "Url": "
          sqs.example" }
        - subscription[TransportType] (form, required): Must be either 'sqs' or 'https'.

- **DELETE** /lti/subscriptions/{id}
    - Description: Delete a Webhook Subscription
    - Parameters:
        - id (path, required): ID

- **GET** /lti/subscriptions/{id}
    - Description: Show a single Webhook Subscription
    - Parameters:
        - id (path, required): ID

- **PUT** /lti/subscriptions/{id}
    - Description: Update a Webhook Subscription
    - Parameters:
        - id (path, required): ID

- **GET** /lti/subscriptions
    - Description: List all Webhook Subscription for a tool proxy

### What If Grades

Path: `/what_if_grades.json`

- **PUT** /v1/submissions/{id}/what_if_grades
    - Description: Update a submission's what-if score and calculate grades
    - Parameters:
        - id (path, required): ID
        - student_entered_score (form, optional): The score the student wants to test

- **PUT** /v1/courses/{course_id}/what_if_grades/reset
    - Description: Reset the what-if scores for the current user for an entire course and recalculate grades
    - Parameters:
        - course_id (path, required): ID

