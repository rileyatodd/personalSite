## My First npm Package

I just published my first open source package on npm, and I have to say I'm pretty excited about it. I've been looking for a problem to solve that would make for a good first package for some time now. It needed to be small, broadly applicable, and useful for solving a problem many people have encountered. Lets start with the problem.

When writing UI components in React or Preact, a common practice is to bind a function to an onClick or other such event handler. like so:
```
increment() {
  this.setState({count: this.state.count + 1})
}

render() {
  return (
    <div onClick={this.increment}>{count}</div>
  )
}
```
This is all well and good and efficient. `this.increment` doesn't change, is only incremented once, and the component only re-renders the div when the count changes.

Problems arise though, when you want to give that function a little more context by passing it an argument. Consider the following example:
```
class MyUserList extends Component {

  state = {
    items: [
      {name: "item 1", id: 1},
      {name: "item 2", id: 2}
    ]
  }

  // This is the function that needs an argument bound to it
  deleteItem(id) {
    let {items} = this.state
    this.setState({items: items.filter(item => item.id !== id)})
  }

  render() {
    let {items} =  this.state

    return (
      <ul class="container">
        {items.map(x => (
          <li class="item">
            {item.name}
            <button onClick={() => this.deleteItem(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    )
  }
}
```

Here we have a list of items and we want to bind a delete handler to each of them. We have used an arrow function to **create a new function** to which we pass a specific id for the item being deleted to the delete handler. 

*Note: you may also see Function.bind() used for this purpose. It achieves the same thing and has the same problems. In this case it would be `this.deleteItem.bind(this, item.id)`*

The problem with this approach is that each time render is called a new function is allocated for each item. Besides potentially thrashing the garbage collector, this can mess with optimizations that React and Preact try to do. If instead of a simple button tag we were handing these functions to a heavy component, it would be a big deal to re-render that heavy component each time the function changes, which is *every time* since we are allocating a new function every time. 

There are a few existing solutions to this problem, but I found them unsatisfactory. The first is to break out a child component wherever you want to bind function arguments like this. In the case above we would replace the button with 
```<DeleteButton id={id} onDelete={this.deleteItem} />``` 
In this way we can bind values to the child component instead of the function and have the child component call the function with those bound arguments. The obvious drawback here is that you may not want to create a whole extra component for something so simple. This feels more like a workaround than a solution sometimes.

There is another solution that works in some cases. You can bind data to the DOM, and pull it off of the event. In the above case you would add the id directly to the button: `<button data-id="{id}">` and then change the handler to look at the event:
```
deleteItem(e) {
  let id = e.target.dataset.id
  let {items} = this.state
  this.setState({items: items.filter(item => item.id !== id)})
}
```

This is a nice approach but it requires your handlers to know about the DOM. I haven't tried yet, but I imagine you'd have a hard time doing this in react native. I'm also not sure this would work with non-string attributes.

Luckily there is a third way, and that is what I wrote my first npm package to do. If the problem we are trying to avoid is allocating a new function on each render, we can *memoize the allocation of that function.* Put another way, we can memoize the binding of values to a function. 

If you don't know about memoization, read up on it! It is a fantastic tool for avoiding repeated computation. The main idea of it is to remember the outcome when you compute something, and if that computation needs to be performed again, you can just return the same result you got last time instead of redoing the computation. In our context that means that instead of creating a new function each time render is called, we can memoize so that we return the same function we created last time if all the arguments are the same.

Check out the example above solved with memoiation via my package [memo-bind](http://github.com/rileyatodd/memo-bind): 
```
import { partial } from 'memo-bind'

class MyUserList extends Component {

  state = {
    items: [
      {name: "item 1", id: 1},
      {name: "item 2", id: 2}
    ]
  }

  // This is the function that needs an argument bound to it
  deleteItem(id) {
    let {items} = this.state
    this.setState({items: items.filter(item => item.id !== id)})
  }

  // If you declare the cache as a property of the component then
  // its lifecycle will match that of the component and you 
  // shouldn't have to worry too much about cleanup or unbounded
  // cache sizes
  fnCache = new Map()

  render() {
    let {items} =  this.state

    return (
      <div class="container">
        {items.map(x => (
          <div class="item">
            {item.name}
            <button onClick={partial(this.fnCache, this.deleteItem, item.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    )
  }
}
```

Here we instantiate a cache on the component that will remember all the functions we've allocated via memo-bind. It's a nice place to store the cache because it will follow the lifecycle of the component. If the component is destroyed, the cache will be too, and all its memory will be free. 

The `partial` function takes the cache as its first argument, the function to bind arguments to as the second, and as many other values as you want to bind to the function. It allocates a function that has those arguments and returns it. Importantly though, the next time partial is called with those same arguments, *it returns the same function, not a new one*. You can bind arbitrary arguments, it doesn't involve the dom, you don't have to refactor your handlers and you don't have to factor out a child component. You just allocate a cache and wrap what would you would have put in an arrow function or a call to .bind() in a call to partial() instead. 

*Note: memo-bind also exports a function called `bind` which is the same as partial except that it accepts a thisArg.*

It is important to note that there are limitations to memoization. The biggest of which is that to memoize a function it must be *referentially transparent* which is to say that it must be a pure function of inputs to outputs with no outside influences or side effects. Luckily, memo-bind doesn't memoize the functions you hand it. It memoizes the binding of arguments to those functions, which is referentially transparent regardless of the function! 

The package itself is tiny, 28 lines of code at the time of me writing this article. It demonstrates some nifty functional programming concepts though. I encourage you to check it out on github, or download it via `npm i memo-bind`. File issues, request features, and let me know what you think! I'm considering making a React / Preact binding for it so that end users wouldn't have to set up the cache themselves or pass it around to every call.

It feels really good to publish my first open source package. I really hope some people can get a decent amount of use out of it. I'll certainly be using it in my side projects going forward.

<link rel="stylesheet" href="/assets/css/darcula.css" />
<script src="/assets/js/highlight.pack.js"></script>
<script>
  hljs.initHighlightingOnLoad()
</script>