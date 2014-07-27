use Rack::Static,
  :urls => ["/css", "/fonts", "/img", "/js"],
  :root => "www"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('www/index.html', File::RDONLY)
  ]
}
