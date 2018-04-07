 FROM python:3
 ENV PYTHONUNBUFFERED 1
 RUN mkdir /code
 WORKDIR /code
 ADD requirements.txt /code/
 RUN pip install -r requirements.txt
 RUN git clone https://github.com/django-tastypie/django-tastypie
 RUN cd django-tastypie && python setup.py install
 ADD . /code/
