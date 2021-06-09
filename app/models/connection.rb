# == Schema Information
#
# Table name: connections
#
#  id         :bigint           not null, primary key
#  user_id1   :integer          not null
#  user_id2   :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  status     :string           not null
#
class Connection < ApplicationRecord
  validates_presence_of :user_id1, :user_id2
  validates :status, inclusion: {in: ['pending_user1', 'pending_user2', 'connected']}
  validate :user_id_order
  validates_uniqueness_of :user_id1, scope: :user_id2, message: 'These users are already connected or pending connection'


  private

  def user_id_order
    errors.add(:user_id1, "must be less than user_id2") if self.user_id1 && self.user_id2 && self.user_id1 >= self.user_id2
  end
end
