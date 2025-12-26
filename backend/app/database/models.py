import datetime
from sqlalchemy import Column, DateTime, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    full_name = Column(String(255))
    role = Column(String(50), default='student')

class UserProfile(Base):
    __tablename__ = "user_profile"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    target_score = Column(Integer)
    test_date = Column(DateTime)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))
    

# speaking module tables
class ReadAloudQuestion(Base):
    __tablename__ = "read_aloud_question"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    text = Column(String, nullable=False)
    preparation_time = Column(Integer, default=30)
    recording_time = Column(Integer, default=40)
    difficulty = Column(String(50))
    category = Column(String(100))
    tags = Column(String)  # Note: For array support, you might need postgresql-specific ARRAY type
    expected_answer = Column(String)
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class RepeatSentenceQuestion(Base):
    __tablename__ = "repeat_sentence_question"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String, nullable=False)
    sentence = Column(String, nullable=False)
    recording_time = Column(Integer, default=40)
    difficulty = Column(String(50))
    category = Column(String(100))
    tags = Column(String)
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class DescribeImageQuestion(Base):
    __tablename__ = "describe_image_question"
    id = Column(Integer, primary_key=True, index=True)
    image_url = Column(String, nullable=False)
    image_type = Column(String(100))
    preparation_time = Column(Integer, default=25)
    speaking_time = Column(Integer, default=40)
    difficulty = Column(String(50))
    category = Column(String(100))
    key_points = Column(String)  # Note: For array support, you might need postgresql-specific ARRAY type
    sample_answer = Column(String)
    title = Column(String(255))
    description = Column(String(500))  # Added description field
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class RetellLectureQuestion(Base):
    __tablename__ = "retell_lecture_question"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String, nullable=False)
    transcript = Column(String, nullable=False)
    duration = Column(Integer)
    key_points = Column(String)  # Note: For array support, you might need postgresql-specific ARRAY type
    subject = Column(String(100))
    preparation_time = Column(Integer, default=10)
    speaking_time = Column(Integer, default=40)
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class AnswerShortQuestion(Base):
    __tablename__ = "answer_short_question"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String, nullable=False)
    question = Column(String, nullable=False)
    correct_answer = Column(String, nullable=False)
    acceptable_answers = Column(String)  # Note: For array support, you might need postgresql-specific ARRAY type
    difficulty = Column(String(50))
    category = Column(String(100))
    tags = Column(String)  # Note: For array support, you might need postgresql-specific ARRAY type
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))


class SummarizeTextQuestion(Base):
    __tablename__ = "summarize_text_question"
    id = Column(Integer, primary_key=True, index=True)
    passage = Column(String, nullable=False)
    word_limit = Column(Integer, default=75)
    time_limit = Column(Integer, default=600)  # 10 minutes in seconds
    sample_summary = Column(String)
    key_ideas = Column(String)  # Note: For array support, you might need postgresql-specific ARRAY type
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class WriteEssayQuestion(Base):
    __tablename__ = "write_essay_question"
    id = Column(Integer, primary_key=True, index=True)
    prompt = Column(String, nullable=False)
    essay_type = Column(String(100))
    word_limit = Column(Integer, default=200)
    time_limit = Column(Integer, default=1200)
    rubric_content = Column(String)
    rubric_form = Column(String)
    rubric_grammar = Column(String)
    rubric_vocabulary = Column(String)
    sample_essay = Column(String)
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))


class ReadingFillBlanksTemplate(Base):
    __tablename__ = "reading_fill_blanks_template"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    text = Column(String, nullable=False)
    blank1_answer = Column(String(100))
    blank1_options = Column(String)  # Will store as JSON string
    blank2_answer = Column(String(100))
    blank2_options = Column(String)
    blank3_answer = Column(String(100))
    blank3_options = Column(String)
    blank4_answer = Column(String(100))
    blank4_options = Column(String)
    blank5_answer = Column(String(100))
    blank5_options = Column(String)
    difficulty = Column(String(50))
    category = Column(String(100))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class ReadingFillBlanksRWTemplate(Base):
    __tablename__ = "reading_fill_blanks_rw_template"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    passage = Column(String, nullable=False)
    time_limit = Column(Integer, default=600)
    blank1_answer = Column(String(100))
    blank1_options = Column(String)  # Will store as JSON string
    blank2_answer = Column(String(100))
    blank2_options = Column(String)
    blank3_answer = Column(String(100))
    blank3_options = Column(String)
    difficulty = Column(String(50))
    category = Column(String(100))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class MultipleChoiceMultipleTemplate(Base):
    __tablename__ = "multiple_choice_multiple_template"
    id = Column(Integer, primary_key=True, index=True)
    passage = Column(String, nullable=False)
    question = Column(String, nullable=False)
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)
    option_e = Column(String)
    correct_answers = Column(String)  # Will store as JSON string
    time_limit = Column(Integer, default=600)
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class MultipleChoiceSingleTemplate(Base):
    __tablename__ = "multiple_choice_single_template"
    id = Column(Integer, primary_key=True, index=True)
    passage = Column(String, nullable=False)
    question = Column(String, nullable=False)
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)
    correct_answer = Column(String(1), nullable=False)
    time_limit = Column(Integer, default=600)
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class ReorderParagraphsTemplate(Base):
    __tablename__ = "reorder_paragraphs_template"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    paragraph1 = Column(String, nullable=False)
    paragraph2 = Column(String, nullable=False)
    paragraph3 = Column(String, nullable=False)
    paragraph4 = Column(String, nullable=False)
    paragraph5 = Column(String)
    correct_order = Column(String)  # Will store as JSON string
    time_limit = Column(Integer, default=600)
    difficulty = Column(String(50))
    category = Column(String(100))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

# Listening
class SummarizeSpokenTextTemplate(Base):
    __tablename__ = "summarize_spoken_text_template"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String, nullable=False)
    transcript = Column(String, nullable=False)
    duration = Column(Integer)
    word_limit = Column(Integer, default=70)
    time_limit = Column(Integer, default=600)
    key_points = Column(String)  # Will store as JSON string
    sample_summary = Column(String)
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class ListeningMultipleChoiceMultipleTemplate(Base):
    __tablename__ = "listening_multiple_choice_multiple_template"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String, nullable=False)
    question = Column(String, nullable=False)
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)
    option_e = Column(String)
    correct_answers = Column(String)  # Will store as JSON string
    transcript = Column(String, nullable=False)
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class ListeningMultipleChoiceSingleTemplate(Base):
    __tablename__ = "listening_multiple_choice_single_template"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String, nullable=False)
    question = Column(String, nullable=False)
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)
    correct_answer = Column(String(1), nullable=False)
    transcript = Column(String, nullable=False)
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class ListeningFillBlanksTemplate(Base):
    __tablename__ = "listening_fill_blanks_template"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    audio_url = Column(String, nullable=False)
    transcript = Column(String, nullable=False)
    duration = Column(Integer)
    blank1_answer = Column(String(100))
    blank1_word = Column(String(100))
    blank2_answer = Column(String(100))
    blank2_word = Column(String(100))
    blank3_answer = Column(String(100))
    blank3_word = Column(String(100))
    extra_words = Column(String)  # Will store as JSON string
    difficulty = Column(String(50))
    category = Column(String(100))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class HighlightCorrectSummaryTemplate(Base):
    __tablename__ = "highlight_correct_summary_template"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String, nullable=False)
    summary_a = Column(String, nullable=False)
    summary_b = Column(String, nullable=False)
    summary_c = Column(String, nullable=False)
    correct_summary = Column(String(1), nullable=False)
    transcript = Column(String, nullable=False)
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class SelectMissingWordTemplate(Base):
    __tablename__ = "select_missing_word_template"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String, nullable=False)
    transcript = Column(String, nullable=False)
    missing_word_position = Column(Integer, nullable=False)
    option_a = Column(String, nullable=False)
    option_b = Column(String, nullable=False)
    option_c = Column(String, nullable=False)
    option_d = Column(String, nullable=False)
    correct_answer = Column(String(1), nullable=False)
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class HighlightIncorrectWordsTemplate(Base):
    __tablename__ = "highlight_incorrect_words_template"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String, nullable=False)
    transcript = Column(String, nullable=False)
    incorrect_words = Column(String)  # Will store as JSON string
    correct_transcript = Column(String, nullable=False)
    difficulty = Column(String(50))
    category = Column(String(100))
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))

class WriteFromDictationTemplate(Base):
    __tablename__ = "write_from_dictation_template"
    id = Column(Integer, primary_key=True, index=True)
    audio_url = Column(String, nullable=False)
    sentence = Column(String, nullable=False)
    play_count = Column(Integer, default=2)
    difficulty = Column(String(50))
    category = Column(String(100))
    key_words = Column(String)  # Will store as JSON string
    title = Column(String(255))
    created_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.datetime.now(datetime.timezone.utc), onupdate=lambda: datetime.datetime.now(datetime.timezone.utc))
