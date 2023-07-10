class GCDisabler
  def initialize(app)
    @app = app
  end

  def call(env)
    GC.start
    GC.disable
    response = @app.call(env)
    GC.enable
    response
  end
end
