# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

# setup sendgrid info
ActionMailer::Base.smtp_settings = {
  :user_name => ENV["sendgrid_account"],
  :password => ENV["sendgrid_password"],
  :domain => 'schemeapp.com',
  :address => 'smtp.sendgrid.net',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}
