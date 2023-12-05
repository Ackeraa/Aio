class MessagesController < ApplicationController
  before_action :set_message, only: %i[ show update destroy agree disagree agree]
  before_action :set_page, only: %i[index]
  before_action :authenticate_user!, only: %i[create update destroy agree disagree agree]

  # GET /messages
  # GET /messages.json
  def index
    render json: Message.search(params[:query], @page, current_user)
  end

  # GET /messages/1
  # GET /messages/1.json
  def show
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

  # POST /messages/1/agree
  # POST /messages/1/agree.json
  def agree
    return render_error(:already_handled) if @message.is_handled

    unless @message.to.include? current_user.id
      return render json: { status: :forbidden }
    end

    group = Group.find(@message.arg1)

    ActiveRecord::Base.transaction do
      @message.update!(is_handled: true)
      group.members << current_user
      puts "adasda", group.members
      group.save!
    rescue ActiveRecord::RecordInvalid => e
      return render json: e, status: :unprocessable_entity
    else
      render json: { status: :ok }
    end

  end

  # POST /messages/1/disagree
  # POST /messages/1/disagree.json
  def disagree
  end

  # POST /messages/1/read
  # POST /messages/1/read.json
  def read
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
