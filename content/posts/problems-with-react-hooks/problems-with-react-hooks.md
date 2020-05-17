(Maybe this should be more generally about not getting sucked into the react ecosystem for every
part of the app you're building, or even about avoiding framework lock-in generally. One could argue
that framework specific solutions are fundamentally worse designs than solutions that can work in 
any scenario)

# Why hooks suck
- I already learned react, why am I learning new things that don't solve any new problems?
- The rules of hooks suck. I have to pay special attention to call order now because magic is happening
  - see https://dillonshook.com/a-critique-of-react-hooks/ for how they can be more confusing than you realize
- They are non-transferrable, react-specific knowledge
- They fragment the ecosystem

# Alternatives
- don't let react manage your state AT ALL
- wrap state in state containers
  - this was the general idea of redux but redux requires so much boilerplate that people
  are constantly looking for ways around it
  - All people are really looking for is observables. 
    - This is the one thing that Angular got right 
    even though they didn't realize it and didn't embrace it fully.
    - Calmm.js got this PERFECTLY right
    - If you model your state and it's udpates as INDEPENDENTLY of your display logic you'll have
    a much better time of things and can even migrate your application to other view frameworks 
    with very little pain