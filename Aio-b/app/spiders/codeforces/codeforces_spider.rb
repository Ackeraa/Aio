module Codeforces

  class CodeforcesSpider

    def spide_languages
      spider, account = Codeforces::CodeforcesDispatcher.instance.distribute(:any)
      login(spider, account)
      page = spider.get('https://codeforces.com/problemset/submit')
      languages = page.css('table.table-form tr')[2].css('td')[1].children.children
        .reject { |option| option.text.lstrip.empty? }
        .map do |option|
          {
            id: option.attributes['value']&.value || nil,
            value: option.text
          }
        end 
    end

    def spide_problems(n = nil)
      response = HTTParty.get('https://codeforces.com/api/problemset.problems')
      problems = JSON.parse(response.body, { symbolize_names: true })[:result][:problems]
      problems.slice!(n..) unless n.nil?
      problems.map! do |problem| 
        {
          :vid => problem[:contestId].to_s + problem[:index],
          :name => problem[:name],
          :source => 'codeforces'
        }
      end
    end

    def spide_problem(id)
      r = -> s do
        s.to_s
         .gsub('$$$', '$')
         .gsub('$$', '$')
         .gsub('&', '\\')
         .gsub(/\$\w\$/) { |c| "${#{c[1]}}$" }
         .gsub(/\<br\>/) { |c| '<br/>' }
      end

      split_id = id.split(/(\d+)/, 2)
      url = "https://codeforces.com/problemset/problem/#{split_id[1]}/#{split_id[2]}"
      page = Nokogiri::HTML(URI.open(url))
      page = page.css('div.problem-statement')
      problem = {}

      name = r.call page.css('div.title')[0].text[3..]
      time_limit = r.call page.css('div.time-limit').children[1].text.split(' ').first
      memory_limit = r.call page.css('div.memory-limit').children[1].text.split(' ').first
      description = r.call page.children[1].css('p')
      input = r.call page.css('div.input-specification p')
      output = r.call page.css('div.output-specification p')
      samples = []
      page.css('div.sample-tests div.sample-test pre').each_slice(2) do |input, output|
        samples << {
          :sample_input => r.(input),
          :sample_output => r.(output)
        }
      end
      hint = r.call page.css('div.note').children[1..]
      problem = {
        name: name,
        time_limit: time_limit,
        memory_limit: memory_limit,
        description: description,
        input: input,
        output: output,
        samples: samples,
        hint: hint
      }
    end

    def submit(problem_id, language, code, account = nil)
      spider, account, spider_id = CodeforcesDispatcher.instance.distribute(account)
      return { result: "Submit Failed" } if spider.nil?
    
      # Add random blanks to code for codeforces requirements.
      emptys = [" ", "\t"] 
      (1..rand(50)).each { code << emptys.sample }

      page = spider.get('http://codeforces.com/problemset/submit')
      form = page.form(class: 'submit-form')
      if form.nil?
        login(spider, account)
        page = spider.get('http://codeforces.com/problemset/submit')
        form = page.form(class: 'submit-form')
      end
      form.submittedProblemCode = problem_id
      form.programTypeId = language 
      form.source = code
      page = spider.submit(form)

      url = "http://codeforces.com/api/user.status?handle=#{account[:name]}&from=1&count=1"
      response = HTTParty.get(url)
      submission_id = JSON.parse(response.body, { symbolize_names: true })[:result][0][:id]

      CodeforcesDispatcher.instance.recycle(spider_id || account)

      get_submission(problem_id, submission_id)
    end

    private

      def login(spider, account)
        puts "Login..."
        page = spider.get("http://codeforces.com/enter")
        form = page.form(id: 'enterForm')
        form.handleOrEmail = account[:name]
        form.password = account[:password]
        page = spider.submit(form)
        puts "Login Successful"
      end

      def get_submission(problem_id, submission_id)
        contest_id = problem_id.split(/(\d+)/, 2)[1]
        url = "https://codeforces.com/contest/#{contest_id}/submission/#{submission_id}"
        while true
          page = Nokogiri::HTML(URI.open(url))
          result = page.css('div.datatable table tr')[1].css('td')[4].text.lstrip.rstrip
          break unless result.include? 'Running' 
        end 
        record = page.css('div.datatable table tr')[1].css('td').map{ |td| td.text.lstrip.rstrip }
        submission = {
          result: record[4],
          time_usage: record[5],
          memory_usage: record[6],
          #submit_time: record[7]
        }
      end
  end
end

if __FILE__ == $0
  spider = Codeforces::CodeforcesSpider.new
  spider.spide_languages
  threads = []

end

