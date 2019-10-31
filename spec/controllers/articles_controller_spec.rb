require 'rails_helper'

describe ArticlesController, type: :controller do
  describe 'GET #new' do
    it "renders the :new template" do
      get :new
      expect(response).to render_template :new
    end
  end

  describe 'GET #edit' do
    it "assigns the requested tweet to @article" do
      article = create(:article)
      get :edit, params: { id: article }
      expect(assigns(:article)).to eq article
    end

    it "renders the :edit template" do
      article = create(:article)
      get :edit, params: { id: article }
      expect(response).to render_template :edit
    end
  end

  describe 'GET #index' do
    it "populates an array of articles ordered by created_at DESC" do
      articles = create_list(:article, 3) 
      get :index
      expect(assigns(:articles)).to match(articles.sort{ |a, b| b.created_at <=> a.created_at })
    end

    it "renders the :index template" do
      get :index
      expect(response).to render_template :index
    end
  end
end