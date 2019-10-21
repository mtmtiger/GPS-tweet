@user = User.create(
  name: "テストユーザー",
  sex: 0,
  age: 2,
  prefecture_id: 23,
  profile: "テストユーザーです",
  email: "test@user",
  password: "testuser1"
)
@user.image.attach(io: File.open('public/test-user-bg.jpg'), filename: 'test-user-bg.jpg')
