# Lunatech Expensify Counter

This is a firefox extension based off the chrome extension made by @smthelusive.
Much of the code is pretty much shared, except for the `browser` vs `chrome`
storage api.


This extension is used to show:
- annual limit to be used on personal budget
- spent amount this year
- left amount for this year

Annual limit is configurable, by default 1200.

Expensify has open an API but it is self-serve and quite poor: doesn't even let to
get reports. So this uses their internal API.
