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
require 'test_helper'

class ConnectionTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
