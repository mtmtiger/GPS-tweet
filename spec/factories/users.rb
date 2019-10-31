FactoryBot.define do
  factory :user do
    password = Faker::Internet.password(min_length: 6, max_length: 12)
    name {Faker::Name.initials(number: 8)}
    sequence(:email) {Faker::Internet.email}
    password {password}
    password_confirmation {password}
  end

end
