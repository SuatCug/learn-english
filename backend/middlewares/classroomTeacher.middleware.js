const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');
const { Classroom } = require('../models');

// :id parametresindeki sınıfı yükler; sadece o sınıfın teacherId'si req.user ile eşleşiyorsa geçer.
// Sonraki handler'ların tekrar sorgu atmaması için sınıfı req.classroom'a koyar.
const requireClassroomTeacher = asyncHandler(async (req, res, next) => {
  const classroom = await Classroom.findById(req.params.id);
  if (!classroom) throw new ApiError(404, 'Sınıf bulunamadı.');

  if (classroom.teacherId.toString() !== req.user.id) {
    throw new ApiError(403, 'Bu işlem için bu sınıfın öğretmeni olmanız gerekir.');
  }

  req.classroom = classroom;
  next();
});

module.exports = requireClassroomTeacher;
