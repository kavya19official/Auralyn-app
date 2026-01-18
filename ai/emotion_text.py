from textblob import TextBlob

def detect_text_emotion(text: str):
    if not text:
        return {"emotion": "neutral", "score": 0.5}

    polarity = TextBlob(text).sentiment.polarity

    if polarity > 0.4:
        return {"emotion": "happy", "score": polarity}
    elif polarity < -0.3:
        return {"emotion": "stressed", "score": abs(polarity)}
    else:
        return {"emotion": "neutral", "score": 0.5}