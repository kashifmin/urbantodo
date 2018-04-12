from datetime import date, timedelta

def week_range(date):
    """Find the first/last day of the week for the given day.
    Assuming weeks start on Sunday and end on Saturday.

    """
    # isocalendar calculates the year, week of the year, and day of the week.
    # dow is Mon = 1, Sat = 6, Sun = 7
    year, week, dow = date.isocalendar()

    # Find the first day of the week. 7 cuz sunday
    if dow == 7:
        start_date = date
    else:
        # Otherwise, subtract `dow` number days to get the first day
        start_date = date - timedelta(dow)

    # Now, add 6 for the last day of the week (i.e., count up to Saturday)
    end_date = start_date + timedelta(6)

    return str(start_date) + ',' + str(end_date)