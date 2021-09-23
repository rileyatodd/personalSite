# Re-Evaluating the Importance of Performance Through the Lens of Environmentalism

## Impact of code performance
Less cycles wasted on unnecessary or inefficient code directly reduces the amount of power 
consumed by running said code which indirectly, in aggregate, results in less coal burned.

## Webpage Bloat as low-hanging fruit
- Less webpage bloat, less cycles spent on network & parsing -> less power consumed
  - This is an easy target because modern toolchains make it easy to make your website BLOATED AS HELL
  - in a mobile-first world reducing network and battery consumption is both respectful of the network AND of
  the user
  - Do you really need a tracking script?
  - Do you really need a front end framework that is several kilobytes gzipped?
  - Do you really need to enforce client side hydration and prefetching of adjacent pages? (Looking at you here Gatsby)

## The Cost of Externalities
As we have discussed above there are real costs to inefficient code. Actual things will happen
in the real world to the detriment of our planet's carrying capacity for human life if, on average,
we undervalue performance and underestimate resource costs. 

However, we as writers of code rarely bare those costs, or even think of them. In the unending rush
to push out more features there are many noble concerns that often don't get the full attention they
deserve. These include security, correctness, system stability, ux polish, accessibility, privacy etc. 
Most organization prioritize these things in a different order but usually all less than new features (there are exceptions.) I would say that in my experience performance usually falls towards the bottom of
this list as long as the product is still generally usable at the current performance level. 

## The Questions this line of thinking raises

- Is there a moral imperative to enforce dark mode by default? It would in aggregate result in
much less power consumed by displays. It may also be more respectful of users eyes? This would
need to be coupled with respect for the users' accessibility needs. 

- Am I being a bad person by not dutifully trimming my blog pages down to a minimum of just the
content?

- Can we come up with some sort of measure of a website's efficiency based on the ratio of actual,
requested content (e.g. the text of article found by search) to the total size of all assets delivered
when an average browser loads the initial url. An even better metric would include any work done to
serve the page but that is harder to measure.

- Have ad-blockers, insofar as they reduce the above ratio, been a huge win for the environment?

- Is it possible to enact legislation to internalize some of these externalities? Could we enforce
some penalties based on efficiency ratings of the type mentioned above?

- Do browser vendors have a moral imperative to offer a "low impact" mode that blocks absolutely 
everything that is not esssential information, and loads things as lazily as possible?
  - If I browse the web from emacs does it work like this?
  - Firefox reader mode is a step in the right direction. 
  - You should be able to reject loading styles altogether and only load content which is styled using user agent styles (which should be customizable per page, with sensible defaults, and accessiblity settings.)
  - One could imagine a browser extension/plugin that does this.
  - It would also be an opportunity to fix bad UI patterns. If you are only ingesting content you 
  can determine the UI that presents that content.

- 