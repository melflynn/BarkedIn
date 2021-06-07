class User < ApplicationRecord
  validates_presence_of :first_name, :last_name, :email
  validates_uniqueness_of :email
  validate :password_presence
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token

  attr_reader :password

  has_one_attached :profile_photo

  def connections
    first = User
      .joins("FULL OUTER JOIN connections ON users.id = connections.user_id1")
      .where("connections.user_id2 = ?", self.id)
      .where("connections.status = 'connected'")

    second = User
      .joins("FULL OUTER JOIN connections ON users.id = connections.user_id2")
      .where("connections.user_id1 = ?", self.id)
      .where("connections.status = 'connected'")

    first + second
  end

  def connection_requests
    first = User
      .joins("FULL OUTER JOIN connections ON users.id = connections.user_id1")
      .where("connections.user_id2 = ?", self.id)
      .where("connections.status = 'pending_user2'")

    second = User
      .joins("FULL OUTER JOIN connections ON users.id = connections.user_id2")
      .where("connections.user_id1 = ?", self.id)
      .where("connections.status = 'pending_user1'")

    first + second
  end

  def requested_connections
    first = User
      .joins("FULL OUTER JOIN connections ON users.id = connections.user_id1")
      .where("connections.user_id2 = ?", self.id)
      .where("connections.status = 'pending_user1'")

    second = User
      .joins("FULL OUTER JOIN connections ON users.id = connections.user_id2")
      .where("connections.user_id1 = ?", self.id)
      .where("connections.status = 'pending_user2'")

    first + second
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end

  def reset_session_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  # def ensure_profile_photo! 
  #   if !self.profile_photo.attached?
  # end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    if user && user.is_password?(password)
      return user
    elsif user.nil?
      return {email: 'Please enter a valid username'}
    elsif password.nil? || password.empty?
      return {password: 'Please enter a password'}
    elsif password.length < 6
      return {password: 'The password you provided must have at least 6 characters.'}
    else 
      return {password: "That's not the right password. Try again"}
    end
  end

  def is_password?(password)
    password_object = BCrypt::Password.new(self.password_digest)
    password_object.is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  private

  def password_presence 
    errors.add(:password, "can't be blank") if self.password_digest.nil?
  end

end
