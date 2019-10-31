require 'rails_helper'
describe User do
  describe '#create' do
    it "nameとemail、passwordとpassword_confirmationが存在すれば登録できること" do
      user = build(:user)
      expect(user).to be_valid
    end

    it "nameが空では登録できないこと" do
      user = build(:user, name: nil)
      user.valid?
      expect(user.errors[:name]).to include("can't be blank")
    end

    it "emailが空では登録できないこと" do
      user = build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "passwordが空では登録できないこと" do
      user = build(:user, password: nil)
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

    it "passwordが存在してもpassword_confirmationが空では登録できないこと" do
      user = build(:user, password_confirmation: "")
      user.valid?
      expect(user.errors[:password_confirmation]).to include("doesn't match Password")
    end

    it "nameが9文字以上では登録できないこと" do
      user = build(:user, name: "aaaaaaaaa")
      user.valid?
      expect(user.errors[:name]).to include("is too long (maximum is 8 characters)")
    end

    it "nameが8文字以下であれば登録できること" do
      user = build(:user, name: "aaaaaaaa")
      expect(user).to be_valid
    end

    it "重複したemailが存在する場合登録できないこと" do
      user = create(:user)
      another_user = build(:user, email: user.email)
      another_user.valid?
      expect(another_user.errors[:email]).to include("has already been taken")
    end

    it "passwordが6文字以上12文字以下であれば登録できること" do
      user = build(:user, password: "a1b2c3A1B2C3", password_confirmation: "a1b2c3A1B2C3")
      expect(user).to be_valid
    end

    it "passwordが13文字以上であれば登録できないこと" do
      user = build(:user, password: "0000000000000", password_confirmation: "0000000000000")
      user.valid?
      expect(user.errors[:password]).to include("is too long (maximum is 12 characters)")
    end

    it "passwordが5文字以下では登録できないこと" do
      user = build(:user, password: "00000", password_confirmation: "00000")
      user.valid?
      expect(user.errors[:password]).to include("is too short (minimum is 6 characters)")
    end
  end
end