import psycopg2


try:
   engine = psycopg2.connect(
    database="postgres",
    user="postgres",
    password="Hayfield!2025",
    host="database-1.choiaiasclhr.us-east-2.rds.amazonaws.com",
    port='5432'
)
   print("Connected to DB")
except psycopg2.OperationalError as e:
   print('error')
#    logger.error(e)
#    sys.exit()