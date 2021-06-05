class Connection < ApplicationRecord
  validates_presence_of :user_id1, :user_id2
  validates :status, inclusion: {in: ['pending_user1', 'pending_user2', 'connected']}
  validate :user_id_order

  private

  def user_id_order
    errors.add(:user_id1, "must be less than user_id2") if self.user_id1 && self.user_id2 && self.user_id1 > self.user_id2
  end
end
