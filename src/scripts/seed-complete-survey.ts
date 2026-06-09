import mongoose from "mongoose";

import { connectDatabase } from "../config/database";

import { SurveyModel } from "../modules/surveys/models/Survey.model";
import { SectionModel } from "../modules/sections/models/Section.model";
import { QuestionModel } from "../modules/questions/models/Question.model";
import { RuleModel } from "../modules/rules/models/Rules.model";

const seedHotelGuestExperienceSurvey = async () => {
  try {
    await connectDatabase();

    console.log("✅ MongoDB Connected");

    const createdBy = new mongoose.Types.ObjectId("6a1eb45263682490c197efd6");

    const surveyId = new mongoose.Types.ObjectId();

    const guestInfoSectionId = new mongoose.Types.ObjectId();
    const bookingSectionId = new mongoose.Types.ObjectId();
    const roomSectionId = new mongoose.Types.ObjectId();
    const staffSectionId = new mongoose.Types.ObjectId();
    const feedbackSectionId = new mongoose.Types.ObjectId();

    await SurveyModel.create({
      _id: surveyId,
      title: "Hotel Guest Experience Survey 2026",
      description:
        "Survey to understand guest satisfaction, room quality, hotel services and overall experience.",
      status: "DRAFT",
      isPublished: false,
      createdBy,
    });

    const q1 = new mongoose.Types.ObjectId();
    const q2 = new mongoose.Types.ObjectId();
    const q3 = new mongoose.Types.ObjectId();
    const q4 = new mongoose.Types.ObjectId();
    const q5 = new mongoose.Types.ObjectId();
    const q6 = new mongoose.Types.ObjectId();
    const q7 = new mongoose.Types.ObjectId();
    const q8 = new mongoose.Types.ObjectId();
    const q9 = new mongoose.Types.ObjectId();
    const q10 = new mongoose.Types.ObjectId();
    const q11 = new mongoose.Types.ObjectId();
    const q12 = new mongoose.Types.ObjectId();
    const q13 = new mongoose.Types.ObjectId();
    const q14 = new mongoose.Types.ObjectId();
    const q15 = new mongoose.Types.ObjectId();

    await SectionModel.insertMany([
      {
        _id: guestInfoSectionId,
        surveyId,
        title: "Guest Information",
        order: 1,
      },
      {
        _id: bookingSectionId,
        surveyId,
        title: "Booking Experience",
        order: 2,
      },
      {
        _id: roomSectionId,
        surveyId,
        title: "Room Experience",
        order: 3,
      },
      {
        _id: staffSectionId,
        surveyId,
        title: "Staff Service",
        order: 4,
      },
      {
        _id: feedbackSectionId,
        surveyId,
        title: "Overall Feedback",
        order: 5,
      },
    ]);

    await QuestionModel.insertMany([
      // Guest Information

      {
        _id: q1,
        surveyId,
        sectionId: guestInfoSectionId,
        title: "What is your full name?",
        type: "TEXT",
        required: true,
        order: 1,
      },
      {
        _id: q2,
        surveyId,
        sectionId: guestInfoSectionId,
        title: "How many nights did you stay?",
        type: "NUMBER",
        required: true,
        order: 2,
      },
      {
        _id: q3,
        surveyId,
        sectionId: guestInfoSectionId,
        title: "Purpose of your stay?",
        type: "DROPDOWN",
        options: ["Business", "Vacation", "Family Trip", "Event", "Other"],
        required: true,
        order: 3,
      },

      // Booking Experience

      {
        _id: q4,
        surveyId,
        sectionId: bookingSectionId,
        title: "How did you book your stay?",
        type: "DROPDOWN",
        options: [
          "Hotel Website",
          "Booking.com",
          "MakeMyTrip",
          "Travel Agent",
          "Walk-in",
        ],
        required: true,
        order: 1,
      },
      {
        _id: q5,
        surveyId,
        sectionId: bookingSectionId,
        title: "Was the booking process easy?",
        type: "RADIO",
        options: ["YES", "NO"],
        required: true,
        order: 2,
      },
      {
        _id: q6,
        surveyId,
        sectionId: bookingSectionId,
        title: "What issues did you face during booking?",
        type: "TEXTAREA",
        required: false,
        order: 3,
      },

      // Room Experience

      {
        _id: q7,
        surveyId,
        sectionId: roomSectionId,
        title: "How would you rate room cleanliness?",
        type: "DROPDOWN",
        options: ["Excellent", "Good", "Average", "Poor"],
        required: true,
        order: 1,
      },
      {
        _id: q8,
        surveyId,
        sectionId: roomSectionId,
        title: "Please describe the cleanliness issues.",
        type: "TEXTAREA",
        required: false,
        order: 2,
      },
      {
        _id: q9,
        surveyId,
        sectionId: roomSectionId,
        title: "Did you use the hotel restaurant?",
        type: "RADIO",
        options: ["YES", "NO"],
        required: true,
        order: 3,
      },
      {
        _id: q10,
        surveyId,
        sectionId: roomSectionId,
        title: "How would you rate the restaurant food?",
        type: "DROPDOWN",
        options: ["Excellent", "Good", "Average", "Poor"],
        required: false,
        order: 4,
      },

      // Staff Service

      {
        _id: q11,
        surveyId,
        sectionId: staffSectionId,
        title: "How would you rate staff behavior?",
        type: "DROPDOWN",
        options: ["Excellent", "Good", "Average", "Poor"],
        required: true,
        order: 1,
      },
      {
        _id: q12,
        surveyId,
        sectionId: staffSectionId,
        title: "Did hotel staff resolve your requests promptly?",
        type: "RADIO",
        options: ["YES", "NO"],
        required: true,
        order: 2,
      },

      // Overall Feedback

      {
        _id: q13,
        surveyId,
        sectionId: feedbackSectionId,
        title: "Would you recommend this hotel to others?",
        type: "RADIO",
        options: ["YES", "NO"],
        required: true,
        order: 1,
      },
      {
        _id: q14,
        surveyId,
        sectionId: feedbackSectionId,
        title: "Why would you not recommend this hotel?",
        type: "TEXTAREA",
        required: false,
        order: 2,
      },
      {
        _id: q15,
        surveyId,
        sectionId: feedbackSectionId,
        title: "Additional comments or suggestions",
        type: "TEXTAREA",
        required: false,
        order: 3,
      },
    ]);

    await RuleModel.insertMany([
      // Booking Issues

      {
        surveyId,
        sourceQuestionId: q5,
        targetQuestionId: q6,
        operator: "EQUALS",
        value: "NO",
        action: "SHOW",
        order: 1,
        isActive: true,
      },
      {
        surveyId,
        sourceQuestionId: q5,
        targetQuestionId: q6,
        operator: "EQUALS",
        value: "NO",
        action: "REQUIRE",
        order: 2,
        isActive: true,
      },

      // Cleanliness Issues

      {
        surveyId,
        sourceQuestionId: q7,
        targetQuestionId: q8,
        operator: "EQUALS",
        value: "Poor",
        action: "SHOW",
        order: 3,
        isActive: true,
      },
      {
        surveyId,
        sourceQuestionId: q7,
        targetQuestionId: q8,
        operator: "EQUALS",
        value: "Poor",
        action: "REQUIRE",
        order: 4,
        isActive: true,
      },

      // Restaurant Rating

      {
        surveyId,
        sourceQuestionId: q9,
        targetQuestionId: q10,
        operator: "EQUALS",
        value: "YES",
        action: "SHOW",
        order: 5,
        isActive: true,
      },
      {
        surveyId,
        sourceQuestionId: q9,
        targetQuestionId: q10,
        operator: "EQUALS",
        value: "YES",
        action: "REQUIRE",
        order: 6,
        isActive: true,
      },

      // Recommendation Feedback

      {
        surveyId,
        sourceQuestionId: q13,
        targetQuestionId: q14,
        operator: "EQUALS",
        value: "NO",
        action: "SHOW",
        order: 7,
        isActive: true,
      },
      {
        surveyId,
        sourceQuestionId: q13,
        targetQuestionId: q14,
        operator: "EQUALS",
        value: "NO",
        action: "REQUIRE",
        order: 8,
        isActive: true,
      },
    ]);

    console.log("🎉 Hotel Guest Experience Survey Seeded Successfully");
    console.log("Survey ID:", surveyId.toString());

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void seedHotelGuestExperienceSurvey();
