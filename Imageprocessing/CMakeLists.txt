cmake_minimum_required(VERSION 2.8)
project(HELLO)
message(build)
set(src_list main.cpp)

include_directories(/usr/local/include /usr/local/include/opencv)
#link_directories(/usr/local/lib/)

add_executable(main ${src_list})

#add dynamic lib
target_link_libraries(main /usr/local/lib/libopencv_calib3d.3.2.0.dylib 
/usr/local/lib/libopencv_calib3d.3.2.dylib 
/usr/local/lib/libopencv_calib3d.dylib 
/usr/local/lib/libopencv_core.3.2.0.dylib 
/usr/local/lib/libopencv_core.3.2.dylib 
/usr/local/lib/libopencv_core.dylib 
/usr/local/lib/libopencv_features2d.3.2.0.dylib 
/usr/local/lib/libopencv_features2d.3.2.dylib 
/usr/local/lib/libopencv_features2d.dylib 
/usr/local/lib/libopencv_flann.3.2.0.dylib 
/usr/local/lib/libopencv_flann.3.2.dylib 
/usr/local/lib/libopencv_flann.dylib 
/usr/local/lib/libopencv_highgui.3.2.0.dylib 
/usr/local/lib/libopencv_highgui.3.2.dylib 
/usr/local/lib/libopencv_highgui.dylib 
/usr/local/lib/libopencv_imgcodecs.3.2.0.dylib 
/usr/local/lib/libopencv_imgcodecs.3.2.dylib 
/usr/local/lib/libopencv_imgcodecs.dylib 
/usr/local/lib/libopencv_imgproc.3.2.0.dylib 
/usr/local/lib/libopencv_imgproc.3.2.dylib 
/usr/local/lib/libopencv_imgproc.dylib 
/usr/local/lib/libopencv_ml.3.2.0.dylib 
/usr/local/lib/libopencv_ml.3.2.dylib 
/usr/local/lib/libopencv_ml.dylib 
/usr/local/lib/libopencv_objdetect.3.2.0.dylib 
/usr/local/lib/libopencv_objdetect.3.2.dylib 
/usr/local/lib/libopencv_objdetect.dylib 
/usr/local/lib/libopencv_photo.3.2.0.dylib 
/usr/local/lib/libopencv_photo.3.2.dylib 
/usr/local/lib/libopencv_photo.dylib 
/usr/local/lib/libopencv_shape.3.2.0.dylib 
/usr/local/lib/libopencv_shape.3.2.dylib 
/usr/local/lib/libopencv_shape.dylib 
/usr/local/lib/libopencv_stitching.3.2.0.dylib 
/usr/local/lib/libopencv_stitching.3.2.dylib 
/usr/local/lib/libopencv_stitching.dylib 
/usr/local/lib/libopencv_superres.3.2.0.dylib 
/usr/local/lib/libopencv_superres.3.2.dylib 
/usr/local/lib/libopencv_superres.dylib 
/usr/local/lib/libopencv_video.3.2.0.dylib 
/usr/local/lib/libopencv_video.3.2.dylib 
/usr/local/lib/libopencv_video.dylib 
/usr/local/lib/libopencv_videoio.3.2.0.dylib 
/usr/local/lib/libopencv_videoio.3.2.dylib 
/usr/local/lib/libopencv_videoio.dylib 
/usr/local/lib/libopencv_videostab.3.2.0.dylib 
/usr/local/lib/libopencv_videostab.3.2.dylib 
/usr/local/lib/libopencv_videostab.dylib)