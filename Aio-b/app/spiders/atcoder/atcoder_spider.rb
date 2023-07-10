module Atcoder
  class AtcoderSpider

    def spide_languages
      spider, account = AtcoderDispatcher.instance.distribute(:any) 
      login(spider, account)
      page = spider.get('https://atcoder.jp/contests/agc001/tasks/agc001_a')
      languages = page.xpath('//*[@id="select-lang"]/select').css('option')
        .reject { |option| option.text.nil? || option.text.empty? }
        .map do |option|
          {
            id: option.attributes['value']&.value || nil,
            value: option.text
          }
        end 
    end

    def test
      url = 'https://atcoder.jp/contests/agc001/submissions/22096003'
      page = Nokogiri::HTML(URI.open(url))
      status = page.css('table tr').map{ |x| x.css('td').text }
      status[0]
    end

    def spide_problems(n = nil)
      problems = []
      i = 1
      begin
        puts "spide problems from atcoder page #{i}"
        url = "https://atcoder.jp/contests/archive?page=#{i}"
        page = Nokogiri::HTML(URI.open(url))
        links = page.css('tbody tr').map { |tr| tr.css('td a')[1]['href'] }
        links.each do |link| 
          url = "https://atcoder.jp#{link}/tasks"
          begin
            page = Nokogiri::HTML(URI.open(url))
            page.css('tbody tr').each do |tr| 
              problems << {
                vid: tr.css('td a')[1]['href'].split('/').last,
                name: tr.css('td a')[1].text,
                source: 'atcoder'
              }
            end
          rescue => e
            puts e
            puts "spide problems from #{url} failed"
          end
        end
        i += 1
      end until links.empty?
      problems
    end

    def spide_problem(problem_id)
      r = -> s do
        s.to_s
          .gsub("<var>", "$")
          .gsub("</var>", "$")
          .gsub("≦", " \\le ")
          .gsub('&', '\\')
          .gsub(/\$\w\$/) { |c| "${" + c[1] + "}$" }
      end

      url = "https://atcoder.jp/contests/#{problem_id.split('_').first}/tasks/#{problem_id}"
      page = Nokogiri::HTML(URI.open(url))
      problem = {}

      t_m = page.xpath('//*[@id="main-container"]/div[1]/div[2]/p').text
        .strip.gsub(/[^0-9]/, ' ').split
      time_limit = t_m[0].to_i
      memory_limit = t_m[1].to_i
      page = page.css('div#task-statement span.lang-en').children
        .select{ |x| x.name == 'div' or x.name == 'hr' }
      indices = page.each_with_index.select{ |x, i| x.name == 'hr' }.map{ |x| x[1] }

      description = page[0].css('p')
      page[1...indices[0]].each{ |x| description << x }
      description = r.(description)

      input = r.call page[indices[0] + 1].css('section')[0].children[2..]
      output = r.call page[indices[0] + 1].css('section')[1].children[2..]

      samples = []
      i = indices[1] + 1
      begin
        sample_input = r.call page[i].css('pre') 
        sample_output = r.call page[i + 1].css('pre') 
        sample_hint = r.call page[i + 1].css('p')
        samples << {
          sample_input: sample_input,
          sample_output: sample_output,
          sample_hint: sample_hint
        }
        i += 3
      end until i >= page.length

      problem = {
        time_limit: time_limit,
        memory_limit: memory_limit,
        description: description,
        input: input,
        output: output,
        samples: samples,
      }
    end

    def submit(problem_id, language, code, account = nil)
      spider, account, spider_id = AtcoderDispatcher.instance.distribute(account)

      url = "https://atcoder.jp/contests/#{problem_id.split('_').first}/tasks/#{problem_id}"
      begin
        page = spider.get(url)
        form = page.form(class: 'form-horizontal form-code-submit')
        raise RuntimeError, "Not Login" unless form
        form.field_with(name: 'data.LanguageId').value = language
        form.sourceCode = code
        page = spider.submit(form)
        raise RuntimeError, "Redirected" if page.uri.to_s[-2..] != "me"
      rescue RuntimeError => e
        puts e
        e.to_s == "Not Login"? login(spider, account) : sleep(2)
        retry
      end
      submission_id = page.css('tbody tr')[0].css('td a').last['href'].split('/').last

      AtcoderDispatcher.instance.recycle(spider_id || account)

      get_submission(problem_id, submission_id)
    end

    private

    def login(spider, account)
      puts "Login......"
      page = spider.get('https://atcoder.jp/login')
      form = page.form(:class => 'form-horizontal' )
      form.username = account[:name]
      form.password = account[:password]
      page = spider.submit(form)
      puts "Login Successful"
    end

    def get_submission(problem_id, submission_id)
      url = "https://atcoder.jp/contests/#{problem_id.split('_').first}/submissions/#{submission_id}"
      while true
        page = Nokogiri::HTML(URI.open(url))
        result = page.css('table tr')[6].css('td').last.text
        break unless result == 'WJ'
        sleep 0.5
      end
      record = page.css('table tr').map{ |x| x.css('td').text }
      submission = {
        #submit_time: record[0],
        #score: record[4],
        code_size: record[5],
        result: record[6],
        time_usage: record[6] == 'CE' ?  nil : record[7],
        memory_usage: record[6] == 'CE' ? nil : record[8]
      }
    end
  end
end

if __FILE__ == $0
  threads = []
  start = Time.now
  1.times { |i|
    threads << Thread.new {
      spider = AtcoderSpider.new
      #puts spider.submit("agc00#{1}_a", '4003', 1)
      spider.spide_problem("agc001_c")
    }
  }
  threads.each(&:join)
  puts Time.now - start
end
