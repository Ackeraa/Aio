module Poj
  class PojSpider

    def spide_languages
      spider, account = PojDispatcher.instance.distribute(:any) 
      page = login(spider, account)
      page.css('select').css('option')
        .map do |option|
          {
            id: option.attributes['value'].value,
            value: option.text
          }
        end 
    end

    def spide_problems(n = nil)
      problems = []
      url = "http://poj.org/problemlist"
      page = Nokogiri::HTML(URI.open(url))
      total = page.xpath('/html/body/center').css('a').size
      (1..total).each do |i|
        puts "spide problems from poj page #{i}"
        page.css('table')[4].children[2..]
          .each do |tr|
            problems << {
              vid: tr.css('td')[0].text,
              name: tr.css('td')[1].text,
              source: 'poj'
            } unless tr.text.strip.empty?
          end
        url = "http://poj.org/problemlist?volume=#{i + 1}"
        page = Nokogiri::HTML(URI.open(url))
      end
      problems
    end

    def spide_problem(problem_id)
      url = "http://poj.org/problem?id=#{problem_id}"
      page = Nokogiri::HTML(URI.open(url))
      problem = {}

      t_m = page.css('div.plm tr')[0].text
              .strip.gsub(/[^0-9]/, ' ').split
      time_limit = t_m[0].to_i
      memory_limit = t_m[1].to_i

      description = page.css('div.ptx')[0].text
      input = page.css('div.ptx')[1].text
      output = page.css('div.ptx')[2].text
      sample_input = page.css('pre')[0].text
      sample_output = page.css('pre')[1].text

      samples = [
        {
          sample_input: sample_input,
          sample_output: sample_output,
        }
      ]
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
      spider, account, spider_id = PojDispatcher.instance.distribute(account)

      url = "http://poj.org/submit?problem_id=#{problem_id}"
      form = spider.get(url).forms[2]
      form = login(spider, account).forms[2] if form.nil?
      form.problem_id = problem_id
      form.field_with(name: 'language').value = language
      form.source = code
      form.encoded = 0
      spider.submit(form)
      p "Submit successful"

      url = "http://poj.org/status?user_id=#{account[:name]}"
      page = spider.get(url)
      submission_id = page.css('table').last.css('tr')[1].css('td')[0].text

      PojDispatcher.instance.recycle(spider_id || account)

      get_submission(account[:name], submission_id)
    end

      def login(spider, account)
        page = spider.get('http://poj.org/submit')
        form = page.form()
        form.user_id1 = account[:name]
        form.password1 = account[:password]
        p "Login Successful.............."
        spider.submit(form)
      end

      def get_submission(user_id, submission_id)
        not_finished = -> result do
          p 'resut', result
          ['Waiting', 'Compiling', 'Running & Judging'].include? result
        end
        format = -> result do
          case result
          when 'Accepted'
            'AC'
          when 'Wrong Answer'
            'WA'
          when 'Compile Error'
            'CE'
          when 'Time Limit Exceeded'
            'TLE'
          when 'Memory Limit Exceeded'
            'MLE'
          else
            'Unknown'
          end
        end

        p "Begin to get status"
        url = "http://poj.org/status?user_id=#{user_id}"
        while true
          while true
            p "fuck11111"
            page = Nokogiri::HTML(URI.open(url))
            record = page.css('table').last.css('tr')
              .find{ |tr| tr.css('td')[0].text == submission_id }
            break if record
            a = page.xpath('/html/body/p[2]/a[3]')[0].attributes['href'].value
            url = "http://poj.org/#{a}"
          end
          break unless not_finished.(record.css('td')[3].text)
          sleep 0.5
        end 
        record = record.css('td').map{ |td| td.text }
        submission = {
          solution_size: record[7],
          result: format.(record[3]),
          time_usage: record[5],
          memory_usage: record[4]
        }
        p submission
        submission
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
