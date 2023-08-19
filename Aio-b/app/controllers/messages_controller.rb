class MessagesController < ApplicationController
  before_action :set_message, only: %i[ show update destroy ]
  before_action :set_page, only: %i[search]

  # GET /messages
  # GET /messages.json
  def index
    @messages = Message.all
  end

  # GET /messages/1
  # GET /messages/1.json
  def show
  end

  # GET /messages/search
  # GET /messages/search.json
  def search
    query = params[:query]
    puts "asdad", query
    total = Message.where('category ilike(?)',  "%#{query}%").count
    @messages = Message.where('category ilike(?)',  "%#{query}%").limit(20).offset(@page * 20)
    render json: { total: total, messages: @messages }
  end


  # POST /messages
  # POST /messages.json
  def create
    @message = Message.new(message_params)

    if @message.save
      render :show, status: :created, location: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /messages/1
  # PATCH/PUT /messages/1.json
  def update
    if @message.update(message_params)
      render :show, status: :ok, location: @message
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message.destroy
  end

  private
    def set_page
      @page = (params[:page] || 1).to_i - 1
    end

    # Use callbacks to share common setup or constraints between actions.
    def set_message
      @message = Message.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def message_params
      params.require(:message).permit(:type, :from, :to, :arg1)
    end
end
