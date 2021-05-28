class ApplicationController < ActionController::Base

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def require_login
    redirect_to root unless logged_in?
  end

  def require_logout
    redirect_to root if logged_in?
  end

  def login(user)
    session[:session_token] = user.reset_session_token!
    @current_user = user
  end

  def logout
    current_user.reset_session_token! if logged_in?
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end

end
