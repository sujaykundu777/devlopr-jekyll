# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "devlopr"
  spec.version       = "0.5.0"
  spec.authors       = ["Sujay Kundu"]
  spec.email         = ["sujaykundu777@gmail.com"]

  spec.summary       = %q{ A Jekyll Theme built for developers }
  spec.homepage      = "https://github.com/sujaykundu777/devlopr-jekyll"
  spec.license       = "MIT"

  spec.metadata["plugin_type"] = "theme"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r{^(assets|categories|tags|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))}i)
  end

  spec.add_runtime_dependency "jekyll", ">= 3.5", "< 5.0"
  spec.add_runtime_dependency "jekyll-sitemap", '~> 1.4.0'
  spec.add_runtime_dependency "jekyll-feed", '>= 0.13', '< 0.18'
  spec.add_runtime_dependency "jekyll-seo-tag", '~> 2.6.1'
  spec.add_runtime_dependency "jekyll-paginate", '~> 1.1.0'
  spec.add_runtime_dependency "jekyll-gist", '~> 1.5.0'
  # spec.add_runtime_dependency "jekyll-admin", '~> 0.11.0'

  spec.add_development_dependency "bundler", "~> 2.5.15"
  spec.add_development_dependency "rake", "~> 13.2.1"
end