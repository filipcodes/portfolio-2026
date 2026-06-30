export interface Article {
  slug: string
  title: string
  date: string
  content: string
}

export const featuredArticles: readonly Article[] = [
  {
    slug: 'eslint-remedies-slop',
    title: 'ESLint as a way to remedy slop',
    date: 'JUN 15, 2026',
    content: `The first time I caught Claude writing something that compiled but did the wrong thing, I learned to stop trusting "looks fine" as a heuristic. AI-assisted code has a particular failure mode: it produces output that satisfies the surface contract — types align, tests pass, the LSP is quiet — while quietly violating the intent.

I call this slop. Not bad code in the obvious sense; something more insidious. The branches that handle conditions that can't happen. The promises that are constructed but never awaited. The if-user-dot-name checks that mask the fact that name is always present and the real concern was something else. Code that's technically correct, semantically off.

ESLint, properly configured, catches a surprising amount of it.

The rules I lean on the hardest live in @typescript-eslint. No-unnecessary-condition flags conditions that, per the type system, can never be falsy. When Claude generates a defensive check on a value that TypeScript already knows to be present, this rule complains. The complaint is the signal that the model hallucinated a defense. No-floating-promises catches an unhandled async call — the classic slop pattern of constructed-but-never-awaited chains that drop errors silently. No-misused-promises flags passing async functions where void is expected; particularly common in event handlers. Strict-boolean-expressions refuses to coerce strings, numbers, or objects to booleans in conditions, forcing explicit nullish checks. No-confusing-void-expression catches the return console.log mistakes.

I run all of these as error, not warn. Warnings are negotiable; errors are not. If the lint output has twelve warnings, no one looks at them; if the build fails, someone fixes them.

The unfair leverage is that I'm not the only one reading the output. Claude reads it too. The same model that produced the slop, given the lint failure as context, almost always corrects it cleanly. ESLint becomes a negotiation tool — a way of telling the model what "correct" actually means in this codebase, encoded as machine-readable rules rather than English prose.

This is a different stance than treating ESLint as a code-quality tool. The traditional framing — lint as taste enforcement — doesn't quite fit. The newer framing is lint as a boundary between what compiles and what's plausibly intended.

It also changes the rules I care about. Style rules — no-mixed-spaces-and-tabs, the indent variants, jsx-quotes — are no longer interesting. Prettier handles those, and they don't catch slop. The interesting rules are semantic: rules that encode what a careful human would notice in review.

One concrete example. Last month I asked Claude to add error handling to a route. It produced a try block that caught the error, logged it with console.error, and threw a new Error with the message "Failed". This passes type-check. It "handles" the error. It even has logging. But the slop is everywhere: the error message has lost all information, the thrown error has no cause, and the original stack is gone. The lint rule that caught this is only-throw-error plus no-throw-literal plus a custom rule that requires errors to preserve cause. Once those rules fire, Claude rewrites the throw to pass the original as a cause. Better. Still not great. But the lint did the work that would have otherwise been a review comment.

The trap is overdoing it. Every rule you add is a rule that fires on legitimate code occasionally. The trick is curating a small set that catches a lot. My team's set is about twenty-five rules. We add one or two a month when we see slop the lint missed; we delete one a year when a rule fires too often on real code.

I don't think this approach replaces review. It does change what review is for. Review is no longer about catching wrong code; the lint catches that. Review is about catching wrong thinking. Did this solution match the actual problem? Are the boundaries drawn in the right places? Did we ship the right primitive?

That's the part no rule can encode. But every rule that can encode something is one fewer thing the reviewer has to track. The lint is the floor. The floor is what makes the ceiling possible.`,
  },
  {
    slug: 'tears-of-the-giraffe',
    title: 'Tears of the Giraffe: Visualization of nanoscopic data',
    date: 'MAY 08, 2026',
    content: `Tears of the Giraffe is a quiet book. It's the second in McCall Smith's No. 1 Ladies' Detective Agency series, set in Botswana. The title comes from a sentence late in the book: that giraffes weep. Whether they actually do is unclear; the metaphor is what matters.

I've been thinking about that metaphor a lot while working on a visualization problem at extremely small scales.

The problem: we had three years of cellular-imaging data from a research collaboration. Each scan produced about two million individual cells, each cell tagged with about forty measurements. The interesting events — the cells we cared about — comprised roughly three thousandths of one percent of the data. Three in every million.

This is, in the visualization literature, the rare-events problem. The standard charts don't work. A histogram averages the rare events into a flat baseline. A heatmap shows the bulk distribution but obscures the outliers. A scatter plot at this scale becomes a solid gradient where the dots overlap so densely that the rare ones are indistinguishable from noise. The biologists who needed to find the rare events were squinting at charts that, by design, hid them.

I spent two weeks pulling apart the techniques that the data-vis community has developed for this. The good ones, in rough order of how much I ended up using them.

Logarithmic binning. The first move is always to stop pretending data is uniform. If the rare events occur at three thousandths of one percent, a linear axis spreads them across pixels that mostly contain nothing. Log binning compresses the dense regions and stretches the sparse ones, making the rare events visible without losing the bulk distribution. This is not new; histograms in physics have done it for a century. It's the cheapest gain available and the one most often skipped.

Focus and context. The technique behind every interactive map. Show the whole dataset at a coarse resolution, with a selectable lens that zooms a single region to full detail. The user navigates the bulk at one zoom level and inspects the rare events at another. The contract is that the lens stays anchored — you never lose where you are in the larger structure. The implementation is fiddly because the lens needs its own coordinate system that aligns with the parent's.

Semantic zoom. Stronger than focus and context. As the user zooms in, the representation itself changes. At the broad view you see a heatmap; at the medium view you see a hex-binning aggregation; at the fine view you see individual cells. The data doesn't change — the encoding does, to match what's useful at that scale. This is harder to implement than it looks because each zoom level needs its own aesthetic that composes with the others. A poorly-tuned transition between levels reads as glitchy; a well-tuned one reads as a single continuous chart.

Hierarchical pre-aggregation. Brushing through two million points in a browser is impossible. The trick is to compute aggregations before rendering, at multiple resolutions, and serve the right level based on viewport size. We stored seven levels of aggregation, from one bucket per pixel at the broadest view down to individual cells at the finest. The aggregation that's served depends on what's in the viewport. The user doesn't see the buckets switching; they just see the chart respond at every scale. Implementing this is mostly engineering — the visualization part is straightforward; the data pipeline that produces seven correct aggregations is where the bodies are buried.

Outlier reservation. Even when you aggregate, the rare events need to survive. The standard mean-or-median aggregation kills them. The technique is to reserve a small portion of every bucket — say ten percent — for the most extreme events, regardless of how many there are. The bucket shows the bulk distribution plus the most interesting outliers, not just the average. This is the move that made the rare-event problem solvable for us; without it, every aggregation level smoothed the giraffes' tears into noise. The biologists couldn't have used the tool without this. The other techniques are about navigation; this one is about preservation.

Annotation layer. Once the rare events are visible, the user needs to act on them. Click to inspect, hover to label, drag to select a region. The annotation layer is a separate render pass on top of the visualization, and it has to stay aligned with the zoom level. This was the most fiddly piece of the implementation; thirty percent of the bug reports came from annotations drifting one pixel off as the chart transitioned between zoom levels. Solving it required treating annotations as first-class participants in the layout, not as decorations on top.

Temporal coupling. The dataset wasn't static; it accumulated over time. Showing a time series of the rare events — when they happen, and whether they cluster — required animating the visualization across time while preserving the spatial encoding. The implementation: a vertical stack of charts, one per time slice, with the user's selection propagating across all slices. Reading this layout is harder than reading a single chart, but it's the only way to see the pattern of when the rare events occur. Without temporal coupling, the rare events look like noise; with it, they cluster, and the clusters tell you something about cause.

The seven techniques compose. None of them, individually, would have made the rare events visible. Together, they made a chart that the biologists could read at three different scales without losing their place. The biologists started using it. The rare events they cared about — the giraffes' tears — were now visible.

What I learned from the project is less about the techniques and more about what visualization is for at small scales. The standard framing — visualization shows you the data — breaks down here. Two million points is not something a human can see. The visualization is doing aggregation, summary, and selection on behalf of the viewer; it's a cognitive tool, not a window. The biologist isn't reading the chart; they're using the chart to navigate a question they couldn't otherwise hold in their head.

That framing changes the design priorities. Aesthetics matter less than navigability. Color scales matter less than zoom transitions. The chart that works is the one whose interaction model matches the user's cognitive model — the one that makes the question askable, not the one that displays the answer.

The metaphor in the McCall Smith title is unrelated to any of this. He used it to mean something quiet and seldom-noticed. I'm using it because the giraffes' tears in our data were a metaphor we couldn't see until we built the right tool to look at them. The data was always there. The visualization is what made looking possible.`,
  },
  {
    slug: 'wasting-tokens',
    title: 'Wasting tokens: on how I identified 30 feature requests overnight',
    date: 'APR 22, 2026',
    content: `I had a Saturday morning to kill and a folder of about 2,400 messages from the support inbox. The team had been asking for a feature-request list for two months. No one had had the time to do it manually. I had Claude.

I called this experiment "wasting tokens" because that's what it felt like at the start. The cheap, sensible solution would have been to spend two hours grepping for keywords, dropping the hits into a spreadsheet, and writing a brief. The wasteful solution was to feed all 2,400 messages to a model and ask it to extract structured feature requests.

I went with wasteful. Some lessons.

The prompt that worked. The first iteration of the prompt was the one I expected to fail. "Read these messages. Extract feature requests. Return them as a list." This produced exactly what you'd expect: a flat list of vague paraphrases, half of which were "users want better UX" and the other half of which were "the export feature could be improved." Useless. Each feature request was just a summary of a complaint.

The prompt that worked was specific. I asked for the exact quote from the user verbatim. The implicit feature being requested, one sentence, infinitive form. The level-of-effort estimate as small, medium, or large. Whether the request was already on the roadmap. Adjacent features mentioned in the same message. The structured output forced precision. Vague complaints got rejected because they couldn't be cast as a feature. The cost of being specific is that some requests got dropped; the benefit is that the ones that survived were actionable.

Chunking. The conversation log was 2,400 messages totaling about 180,000 words. That's bigger than any single context can hold cleanly. I chunked by week — twelve chunks total — and ran each chunk independently. Each chunk produced five to fifteen feature requests. The chunks were independent, which meant duplicates emerged across them. That's a feature, not a bug; it surfaces the requests that came up repeatedly.

Deduplication. The dedup step was the most expensive part of the workflow. I ran a second pass: feed all extracted requests into a fresh context, ask the model to group near-duplicates and merge them. The grouping was good but imperfect; about ten percent of the merges were wrong — different requests grouped together — and five percent were missed — true duplicates not grouped. I reviewed the merges manually. This took about forty minutes — the only manual step in the workflow.

The token cost. Twelve extraction passes plus one dedup pass plus my exploratory iteration came out to about 1.2 million tokens. At the time, that was around four dollars. The "wasting tokens" framing in the title is ironic. Four dollars for what would have been six hours of focused human work, and the output was better than what a tired human reviewer would have produced.

The thirty feature requests. What came out the other side was a ranked list of thirty distinct feature requests, each with verbatim user quotes, effort estimates, and notes on adjacent requests. The team adopted three of them in the next sprint. Six more went into the long-tail backlog. The rest were either already shipped, already planned, or genuinely not worth the effort. A list of feature requests, end-to-end, in one Saturday morning.

What the workflow taught me. The framing of the task as wasteful turned out to be wrong, but it took the experiment to see why. The model isn't expensive compared to a human. The model is cheaper than a human at this task. The only thing that's expensive is the framing: treating model time as something to conserve when human time is the actual constraint.

The right question, when you're about to waste tokens, is whether the tokens are wasted relative to the alternative. The alternative here was a feature backlog that wasn't going to get written. The tokens weren't wasted; the comparison was. Four dollars and a Saturday morning is a different price than two hours of focused human work because the focused human work wasn't going to happen.

The other lesson is about what to ask for. Asking for a flat list of feature requests produced a flat list of useless summaries. Asking for a structured table — verbatim quote, inferred feature, effort, adjacency — produced something a product manager could act on. The model's output is downstream of the prompt's structure; an unstructured prompt produces unstructured slop.

I now have a folder of these workflows. Customer feedback extraction. Competitive feature analysis. Documentation gap-finding. The pattern is the same: a corpus that no human will read end-to-end, a structured extraction prompt, a chunked execution, a dedup pass, a human review of the merges. Each one takes a Saturday. Each one produces an artifact that the team would otherwise not have. None of them is the model's job. All of them are tasks the model can do well enough that paying four dollars to do them is a steal.

The "wasting tokens" framing is dead. The tokens were not wasted. The tokens were the cheapest part of the entire workflow.`,
  },
]
