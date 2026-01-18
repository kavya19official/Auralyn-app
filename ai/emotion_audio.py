def detect_audio_emotion(noise_level: float):
    if noise_level > 85:
        return {"emotion": "energetic", "score": 0.9}
    elif noise_level > 60:
        return {"emotion": "happy", "score": 0.7}
    elif noise_level < 30:
        return {"emotion": "calm", "score": 0.8}
    else:
        return {"emotion": "neutral", "score": 0.5}