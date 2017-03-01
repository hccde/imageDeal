#include <iostream>
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>

#include <opencv2/opencv.hpp>

#include <cv.h>
#include <highgui.h>

using namespace cv;

int main(){
	Mat inputImage = imread("/Users/admos/Desktop/workspace/test.jpg",
		CV_LOAD_IMAGE_ANYCOLOR);
	Mat outputImage;

	Canny(inputImage,outputImage,122,255);

	if(inputImage.rows > 0){
		resize(outputImage,outputImage,Size(480,360));
		namedWindow("Camera",0);
		imshow("Camera",outputImage);
	}
	waitKey(0);

	inputImage.release();
	outputImage.release();

	return 0;
}