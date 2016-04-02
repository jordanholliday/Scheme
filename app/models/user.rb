class User < ActiveRecord::Base
  before_validation :ensure_session_token
  before_save :downcase_email_remove_whitespace
  validates :email, :name, :password_digest, :session_token, presence: true

  has_attached_file :avatar
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\Z/

  has_many(
    :tasks,
    class_name: 'Task',
    primary_key: :id,
    foreign_key: :creator_id
  )


  attr_reader :password

  def password=(password)
    @password = password.strip
    self.password_digest = BCrypt::Password.create(password).to_s
  end

  def is_password?(password)
    BCrypt::Password.new(password_digest).is_password?(password.strip)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email.downcase.strip)
    return nil unless user

    if user.is_password?(password)
      user
    else
      nil
    end
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    save!
  end

  private
    def ensure_session_token
      self.session_token ||= SecureRandom.urlsafe_base64
    end

    def downcase_email_remove_whitespace
      self.email = self.email.downcase.strip unless self.email.nil?
    end
end
