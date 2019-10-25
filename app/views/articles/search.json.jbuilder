json.array! @search_articles do |article|
  json.id article.id
  json.image image_tag(article.images[0]) 
  json.created_at article.created_at.strftime("%Y/%m/%d(%a)")
  json.nices article.nices.count
  json.title article.title.truncate(18, ommision: "...")
  json.user article.user.name
  json.text article.text.truncate(34, ommision: "...")
end
  
