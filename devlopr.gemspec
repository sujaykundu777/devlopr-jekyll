# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "devlopr"
  spec.version       = "0.2.3"
  spec.authors       = ["Sujay Kundu"]
  spec.email         = ["sujaykundu777@gmail.com"]

  spec.summary       = %q{ A Theme built for developers }
  spec.homepage      = "https://www.sujaykundu.com"
  spec.license       = "MIT"

  spec.files = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README|blog|contact)((\.(txt|md|markdown)|$)))!i)
  end
 
  spec.add_runtime_dependency "jekyll", "~> 3.8"

  spec.add_development_dependency "bundler", "~> 1.16"
  spec.add_development_dependency "rake", "~> 12.0"
end
