class InviteNotifier < ApplicationMailer
  default :from => 'jordan@schemeapp.com'

   # send a signup email to the user, pass in the user object that   contains the user's email address
   def send_signup_email(user, invite)
     @invite = invite
     mail( :to => @invite.email,
     :subject => "#{user.name} invited you to Scheme!" )
   end
end
