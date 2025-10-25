# # app/core/firebase.py

# import firebase_admin
# from firebase_admin import credentials
# import os

# # BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# # cred_path = os.path.join(BASE_DIR, "../firebase-adminsdk.json")

# if not firebase_admin._apps:
#     cred = credentials.Certificate({
#         "type": "service_account",
#         "project_id": "clear-pte-ff08c",
#         "private_key_id": "bc2028fe05e71ce90f4d2ed0c8b09bba352f86c4",
#         "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCJQe5s17Qsv9/4\n9V1K05l4LKVUxQyT7fmcSEsZdtuQQ+6sWzycZBUe2L5UkGJgYNJCYJd5MP6tRNA4\nHRCLXLlZqCSjeJPk6RTH6z0iaguikAEX1T8/heY0Y1btCZ+k18LrKHsItbSm26tQ\npdX0c/j7h6HU0i8F6cAO9GLVq+KLroN0qWuI3Dee7gdGAHju5JD2L2w0q75dGK1t\nOsLHQwZy7OAusHi8hTLLj++oEwK/ZqeLnGyRrUDiN+VAgXzWRsQxHEiKDx4c+I22\nDB09CBJUxcfRpTdIYY/w2R8PpXeZUWTxDQwbHSLCUGdCJFcgCLpYeaKpH70x7PUL\n1x9IccpdAgMBAAECggEACNOIN9A90iwwhJDlWTzMKfyCUTYuqItCuY2zOUWkZDLf\nc+PrZ4nOteIYMys/DZWMT8poUy8XDCCtsb4PZKF80HV4ja6LoXUU6gTdieCp3jVG\nbLhAzfPtVBcYmDuTMYV9D6QrF+n0s6TSmmgKSc2fXYVg9GTjszdPK2cEaAXFQVgf\nwgLbgTBxpA9UJ0xnP9m00cQjPfre/hfqltkYvytLphu7iOBHbNPhHWc0xZtfzPys\n0tQ3+PD1QeJ4GSfYVDZxm5GZk5zX9pIQdXPXC5WV7NwuKZgbL5NjwowjmmLPs9Wz\nOlQL2B91L5KqsrmlinYxXE0SxZZWuqU9HBNWD8cdwQKBgQC/qTRPIZyJnt8UmgEJ\nd5KTi26uOl2KTchJyVgOSMnti4Wfyb9tGoiEStEkFxraRyUDqhAUgsZ6SIKheuWY\nN+4UYm9E6GAuvlIlF+pMzZa2wb4gvrm3Mr3/QomdZ7BSVD3q2pQTmsrtkD12v/X/\n0LSB1wIodjXTgRnEA9Hd679nzQKBgQC3VXQBpwOSmAYwDArc2kGmOBgX0AUg8pEf\nS8imWDN5Zz+gfx0gyStbjGi6oThM5RUqgIP5JPn1i7FMDlgxjw1vPAt79GSB8VPV\nhcFSHttEI+FXY9tGRkfw8gb3u50kDmGM/36HTXq56/Z+jBTu9qhIT1iNvSmtDD+O\nLMji+kI80QKBgCH3vASWQWcGmCTPkoV6AqlRmeEZCQD8/hVNsOR/NAJ8qscB+4I7\npJxFokFSMvkiiMXYexcXglOjzDsQS+apavGD7JJ62KkQJADc9zJ7cU2ckrS8+K8m\nOBQoV7lk6hP9SCf6ayn6UiK+YJZOOSwIciVc1M4U/T8p70YVIznAkWC1AoGBAIpr\n4LzmpxHl6rYYQZNizzJ7I+XG0DiCLQReKc8+xQ6i4C2EDDAW87+ZkfFnjKSySnre\nscZJHtlAccslAX3ZrqEPyvP6IHDkDxImfUJNvewC0z8yS/sRUXwgoRYm94yjtw/I\nUHZED6eU+3Wsupl6brC6B/hsnKzllI76TWri3WQhAoGAbIT5lwdxI1EDsycM/+0N\nlTLSNNchvqNnR4g0XqqAUUpiaoTWqsMsLxgVHBMWBLUv1kumYk+2NOWGfQQDEA/7\nNccrCvu1TtL+o5CmI1S4Z6iKxg4aNzYqJ0GcNhEfrYRToPamtHMFEQ9VG3ozHq9Z\nFZFlp+KX5fvkAeQTkKP4gyo=\n-----END PRIVATE KEY-----\n",
#         "client_email": "firebase-adminsdk-fbsvc@clear-pte-ff08c.iam.gserviceaccount.com",
#         "client_id": "113211040674244231380",
#         "auth_uri": "https://accounts.google.com/o/oauth2/auth",
#         "token_uri": "https://oauth2.googleapis.com/token",
#         "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
#         "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40clear-pte-ff08c.iam.gserviceaccount.com",
#         "universe_domain": "googleapis.com"
#     })
#     firebase_admin.initialize_app(cred)


