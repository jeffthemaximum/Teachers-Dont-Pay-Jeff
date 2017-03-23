# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = "1.0"

# Add folder with webpack generated assets to assets.paths
Rails.application.config.assets.paths << Rails.root.join("app", "assets", "webpack")

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
Rails.application.config.assets.precompile << "server-bundle.js"

type = ENV["REACT_ON_RAILS_ENV"] == "HOT" ? "non_webpack" : "static"
Rails.application.config.assets.precompile +=
  [
    "application_#{type}.js",
    "application_#{type}.css",
    "jeff.scss",


    "landing/vendor.css",
    "landing/bootstrap.min.css",
    "landing/style.css",
    "landing/custom.css",

    "landing/vendor/jquery-1.11.3.min.js",
    "landing/vendor/bootstrap.min.js",
    "landing/vendor/plugin.js",
    "landing/variable.js",
    "landing/map.js",
    "landing/main.js",
    "landing/vendor/html5shiv.min.js"
  ]
