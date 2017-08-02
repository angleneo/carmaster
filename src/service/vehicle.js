/**
 * Created by wujerry on 2017/7/18.
 */
import fetch from '../utils/fetch'
/*
 * 获取用户车辆信息
 */
export const userCars = (userId, phoneNumber) => fetch('/carList.read', {
  userId: userId,
  phoneNumber: phoneNumber
}, 'POST')

/*
 * 切换车辆
 */
export const switchCar = (userId, carId) => fetch('/car.switch', {
  userId: userId,
  phoneNumber: '',
  data: {
    carId: carId
  }
}, 'post')

 /*
  * 删聊车辆
  */
export const deleteCar = (userId, carId) => fetch('/car.delete', {
  userId: userId,
  phoneNumber: '',
  data: {
    carId: carId
  }
}, 'post')

 /*
  * 创建车辆
  */
export const createCar = (userId, phoneNumber, ownerName, brandId, brandName, carNumber, lineId, lineName, milage, modelId, modelName) => fetch(
  '/car.create',
  {
    userId: userId,
    phoneNumber: phoneNumber,
    data: {
      brandId: brandId,
      brandName: brandName,
      carNumber: carNumber,
      lineId: lineId,
      lineName: lineName,
      milage: milage,
      modelId: modelId,
      modelName: modelName,
      ownerName: ownerName
    }
  },
  'POST'
)

 /*
  * 查询车辆详情
  */
export const readCar = (userId, phoneNumber, carId) => fetch('/car.read', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    carId: carId
  }
}, 'POST')

 /*
  * 编辑车辆里程
  */
export const updateCarMilage = (userId, phoneNumber, carId, milage) => fetch('/car.update', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    carId: carId,
    milage: milage
  }
}, 'POST')

/*
 * 获取当前激活车辆
 */
export const getActiveCar = (userId, phoneNumber) => fetch('/carActivated.get', {
  userId: userId,
  phoneNumber: phoneNumber
}, 'POST')

/*
 * 获取品牌列表
 */
export const readCarBrandList = () => fetch('/carBrandList.read', {}, 'GET')

/*
 * 获取车系列表
 */
export const readCarLineList = (brandId) => fetch('/carLineList.read', {brandId: brandId}, 'GET')

/*
 * 获取车型列表
 */
export const readCarModelList = (brandId, lineId) => fetch('/carModelList.read', {brandId: brandId, lineId: lineId}, 'GET')

/*
 * 获取热门品牌列表
 */
export const getHotBrands = () => fetch('/hotBrands.get', {}, 'GET')

/*
 * 维修档案查询
 */
export const readRepairHistory = (userId, phoneNumber, carId, page, count) => fetch('/repairHistory.read', {
  userId: userId,
  phoneNumber: phoneNumber,
  data: {
    carId: carId,
    page: page,
    count: count
  }
}, 'POST')
