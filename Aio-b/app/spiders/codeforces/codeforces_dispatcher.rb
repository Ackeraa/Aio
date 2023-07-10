module Codeforces
  class CodeforcesDispatcher < Dispatcher
    include Singleton

    def initialize
      data = [
        { name: 'test_for_aio',   password: 'test_for_aio_' },
        { name: 'test_for_aio_1', password: 'test_for_aio_' },
        { name: 'test_for_aio_2', password: 'test_for_aio_' },
        { name: 'test_for_aio_4', password: 'test_for_aio_' },
        { name: 'test_for_aio_5', password: 'test_for_aio_' },
      ]
      super(0.5, 40, data)    
    end
  end
end

if __FILE__ == $0

end
