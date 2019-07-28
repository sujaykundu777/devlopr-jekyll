# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "devlopr"
  spec.version       = "0.3.6"
  spec.authors       = ["Sujay Kundu"]
  spec.email         = ["sujaykundu777@gmail.com"]

  spec.summary       = %q{ A Theme built for developers }
  spec.homepage      = "https://github.com/sujaykundu777/devlopr-jekyll"
  spec.license       = "MIT"
	
  spec.metadata["plugin_type"] = "theme"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| 
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i) } 

  spec.add_runtime_dependency "jekyll-sitemap", '~> 1.3', '>= 1.3.1'
  spec.add_runtime_dependency "jekyll-feed", '~> 0.12.1' 
  spec.add_runtime_dependency "jekyll-seo-tag", '~> 2.6', '>= 2.6.1'
  spec.add_runtime_dependency "jekyll-analytics", '~> 0.1.11'
  spec.add_runtime_dependency "jekyll-algolia", '~> 1.4', '>= 1.4.11'
  spec.add_runtime_dependency "jekyll-menus", '~> 0.6.0'

  spec.add_runtime_dependency "jekyll", "~> 3.8.5"
  spec.add_development_dependency "bundler", '~> 2.0', '>= 2.0.1'
  spec.add_development_dependency "rake", "~> 12.0"
end
