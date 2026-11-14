# Ruby removed the no-op taint API in Ruby 4, but Liquid 4.0.3 still calls it.
# Limit this compatibility shim to the local Jekyll process started by run.sh.
class Object
  def tainted?
    false
  end unless method_defined?(:tainted?)

  def untaint
    self
  end unless method_defined?(:untaint)
end
