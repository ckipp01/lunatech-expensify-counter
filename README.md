# lunatech-expensify-counter

google chrome extension to show:
- annual limit to be used on personal budget
- spent amount this year
- left amount for this year

Annual limit is configurable, by default 1200.

Expensify has open API but it is self-serve and quite poor: doesn't even let to get reports.
So there is used their closed API. authToken is fetched from cookies, the session may live quite short (around 1d).
