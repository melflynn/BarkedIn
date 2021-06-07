class User < ApplicationRecord
  validates_presence_of :first_name, :last_name, :email
  validates_uniqueness_of :email
  validate :password_presence
  validates :password, length: { minimum: 6 }, allow_nil: true

  after_initialize :ensure_session_token

  attr_reader :password

  has_one_attached :profile_photo

  def connections
    Connection.where("(user_id1 = ? OR user_id2 = ?) AND status = 'connected'", self.id, self.id)    
  end

  def connected_users
    users = connections.map do |connection|
      if connection.user_id1 == self.id
        connection.user_id2
      else
        connection.user_id1
      end
    end

    User.where("id IN (?)", users)
  end

  def connection_requests
    Connection.where("(user_id1 = ? AND status = 'pending_user1') OR (user_id2 = ? AND status = 'pending_user2')", self.id, self.id)
  end

  def users_requesting_connection
    users = connection_requests.map do |request|
      if request.user_id1 == self.id
        request.user_id2
      else
        request.user_id1
      end
    end

    User.where('id IN (?)', users)
  end

  def requested_connections
    Connection.where("(user_id1 = ? AND status = 'pending_user2') OR (user_id2 = ? AND status = 'pending_user1')", self.id, self.id)
  end

  def pending_users
    users = requested_connections.map do |request|
      if request.user_id1 == self.id
        request.user_id2
      else
        request.user_id1
      end
    end

    User.where('id IN (?)', users)
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
